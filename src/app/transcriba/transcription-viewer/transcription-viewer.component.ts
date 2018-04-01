import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';

import { TranscribaService } from '../transcriba.service';
import { TranscriptionService } from '../transcription.service';
import { RevisionVotingService } from '../revision-voting.service';
import { NotificationService } from '../../utility/notification.service';
import { LoggerService } from '../../utility/logger.service';
import { AuthService } from '../../loopback-auth/auth.service';

import { TranscribaObject } from '../transcriba-object';
import { Revision } from '../revision';
import { TeiElement } from '../../editor/tei-element';
import { User } from '../../loopback-auth/user';
import { Notification } from '../../utility/notification';

@Component({
  selector: 'tr-transcription-viewer',
  templateUrl: './transcription-viewer.component.html',
  styleUrls: ['./transcription-viewer.component.scss']
})
export class TranscriptionViewerComponent implements OnChanges {
  private logger = LoggerService.getCustomLogger('TranscriptionViewerComponent');

  @Input() objectId: any;
  object: TranscribaObject;
  editable = true;
  contents: Array<TeiElement>;
  latestRevision: Revision;
  labels: Array<string> = [];
  user: User;
  hasVoted: boolean;
  permissions: {allowVote: boolean, details: any};
  votings: { accept: Array<User>, refuse: Array<User>};
  markDirty: Array<boolean> = [false, true];

  constructor(
    private transcriba: TranscribaService,
    private transcription: TranscriptionService,
    private voting: RevisionVotingService,
    private router: Router,
    private notify: NotificationService,
    private auth: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.auth.loadUser().then(
      user => {
        this.user = user;
        this.update();
      },
      error => this.logger.error('onChanges', error)
    );
  }

  transcribe() {
    this.transcription.start(this.object.id).then(
      newRevision => {
        this.update();
      },
      () => this.notify.notify(new Notification('request.fail', ['error']))
    );
  }

  voteInFavor() {
    this.voting.accept(this.latestRevision.id).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.update();
      },
      error => this.logger.error('voteInFavor', error)
    );
  }

  voteAgainst() {
    this.voting.refuse(this.latestRevision.id).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.update();
      },
      error => this.logger.error('voteAgainst', error)
    );
  }

  save(content) {
    this.transcription.save(this.object.id, content).then(
      () => this.notify.notify(new Notification('request.success', ['success'])),
      () => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

  publish(content) {
    this.transcription.publish(this.object.id, content).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        // navigate to home, because of bug #3
        //  https://github.com/eisverticker/transcriba/issues/3
        this.router.navigate(['home']);
        // this.update();
      },
      () => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

  abort() {
    this.transcription.abort().then(
      () => this.update(),
      error => this.logger.error('abort', error)
    );
  }

  private update() {
    this.labels = [];
    this.transcriba.loadByID(this.objectId).then(
      obj => this.setObject(obj),
      error => this.logger.error('update', error)
    );
  }

  private setObject(obj: TranscribaObject) {
    this.object = obj;

    // we are preloading a revision based on the status
    //  of the transcriba object
    //  we are loading the stable revision normally
    //  but if the object is occupied then we
    //  need the latest revision to check whether the current user
    //  is the owner

    if (this.object.status === 'occupied') {
      this.transcriba.loadLatestRevision(this.object.id).then(
        latestRevision => {
          if (latestRevision.ownerId === this.auth.userID) {
            this.editable = true;
            this.contents = [latestRevision.content];
          } else {
            this.editable = false;
            this.contents = [latestRevision.content];
          }
        },
        error => this.logger.error('cannot load revision data', error)
      );
    } else { // status isn't occupied

      this.transcriba.loadStableRevision(this.object.id).then(
        stableRevision => {
          if (this.object.status === 'voting') {
            // get latest revision and check whether the user has already voted
            this.transcriba.loadLatestRevision(this.object.id).then(
              latestRevision => {
                this.voting.loadVote(latestRevision).then(
                  vote => {
                    this.transcriba.loadLatestRevisionPermissions(this.object.id).then(
                      permissions => {
                        this.permissions = permissions;
                        this.hasVoted = vote !== 'none';
                        this.contents = [stableRevision.content, latestRevision.content];
                        this.labels = ['Aktuelle Version', 'Neue Version'];
                        this.editable = false;
                        this.latestRevision = latestRevision;

                        // notify user that his work will be checked by other users
                        if (this.permissions.details.isOwner) {
                          this.notify.notify(new Notification('message.workWillBeChecked', ['attention', 'info']));
                        }

                        // notify user that he is not permitted to vote
                        if (!this.permissions.details.eligibleVoter && !this.permissions.details.isOwner) {
                          this.notify.notify(new Notification('message.youAreNoEligibleVoter', ['attention', 'info']));
                        }
                      },
                      error => this.logger.error(error)
                    );
                  },
                  error => this.logger.error('couldn\'t load vote', error)
                );
                this.voting.loadVotings(latestRevision.id).then(
                  votings => this.votings = votings,
                  error => this.logger.error(error)
                );
              },
              error => this.logger.error('can\'t load revision data', error)
            );
          } else if (this.object.status === 'free') {
            this.contents = [stableRevision.content];
            this.editable = false;
          }
        },
        err => this.logger.error('can\'t load revision data', err)
      );

    }
  }

}
