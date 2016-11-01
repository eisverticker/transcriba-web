import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { TranscribaService } from './transcriba.service';
import { TranscriptionService } from './transcription.service';
import { RevisionVotingService } from './revision-voting.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';
import { AuthService } from '../loopback-auth/auth.service';

import { TranscribaObject } from './transcriba-object';
import { Revision } from './revision';
import { TeiElement } from '../editor/tei-element';
import { User } from '../loopback-auth/user';

@Component({
  selector: 'transcription-viewer',
  template:
  `
  <div *ngIf="object">
    <div class="editor-navigation">
      <button (click)="transcribe()" *ngIf="object.status == 'free' && user.isRegistered()" class="btn btn-default">
        An Transkription weiterarbeiten
      </button>
      <div *ngIf="latestRevision && object.status == 'voting' && user.isRegistered() && (hasVoted != undefined && !hasVoted)">
        <div *ngIf="user.id != latestRevision.ownerId" class="alert alert-info">
          <strong>Achtung!</strong> Für dieses Objekt ist eine neue Version verfügbar, bitte überprüfe diese und stimme ab!
        </div>
        <div *ngIf="user.id == latestRevision.ownerId" class="alert alert-info">
          <strong>Danke für deine Mühe!</strong> Deine Arbeit wird nun von der Community überprüft.
        </div>
        <span>Neue Version: </span>
        <button [disabled]="user.id == latestRevision.ownerId" (click)="voteInFavor()" class="btn btn-success">Akzeptieren <span *ngIf="votings" class="badge">{{ votings.accept.length }}</span></button>
        <button [disabled]="user.id == latestRevision.ownerId" (click)="voteAgainst()" class="btn btn-danger">Ablehnen <span *ngIf="votings" class="badge">{{ votings.refuse.length }}</span></button>
      </div>
    </div>
    <tei-editor
      (save)="save($event)"
      (publish)="publish($event)"
      [editable]="editable"
      [contents]="contents"
      [objectId]="object.id"
      [labels]="labels">
    </tei-editor>
  </div>
  `
})
export class TranscriptionViewerComponent implements OnChanges{
  @Input() objectId: any;
  object: TranscribaObject;
  editable: boolean = true;
  contents: Array<TeiElement>;
  latestRevision: Revision;
  labels: Array<string> = [];
  user: User;
  hasVoted: boolean;
  votings: { accept: Array<User>, refuse: Array<User>};

  constructor(
    private transcriba: TranscribaService,
    private transcription: TranscriptionService,
    private voting: RevisionVotingService,
    private router: Router,
    private notify: NotificationService,
    private auth: AuthService

  ){}

  ngOnChanges(){
    this.auth.loadUser().then(
      user => {
        this.user = user;
        this.update();
      },
      err => console.log(err)
    );
  }

  transcribe(){
    this.transcription.start(this.object.id).then(
      newRevision => {
        this.update();
      },
      () => this.notify.notify(new Notification("request.fail", ['error']))
    );
  }

  voteInFavor(){
    this.voting.accept(this.latestRevision.id).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.update();
      },
      err => console.log(err)
    );
  }

  voteAgainst(){
    this.voting.refuse(this.latestRevision.id).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.update();
      },
      err => console.log(err)
    );
  }

  save(content){
    this.transcription.save(this.object.id, content).then(
      () => this.notify.notify(new Notification('request.success', ['success'])),
      () => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

  publish(content){
    this.transcription.publish(this.object.id, content).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.update();
      },
      () => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

  private update(){
    this.labels = [];
    this.transcriba.loadByID(this.objectId).then(
      obj => this.setObject(obj),
      err => console.log("error loading object", err)
    );
  }

  private setObject(obj: TranscribaObject){
    this.object = obj;
    //we are preloading a revision based on the status
    // of the transcriba object
    // we are loading the stable revision normally
    // but if the object is occupied then we
    // need the latest revision to check whether the current user
    // is the owner

    if(this.object.status == 'occupied'){
      this.transcriba.loadLatestRevision(this.object.id).then(
        latestRevision => {
          if(latestRevision.ownerId == this.auth.userID){
            this.editable = true;
            this.contents = [latestRevision.content];
          }else{
            this.editable = false;
            this.contents = [latestRevision.content];
          }
        },
        err => console.log("can't load revision data", err)
      );
    }else{//status isn't occupied

      this.transcriba.loadStableRevision(this.object.id).then(
        stableRevision => {
          if(this.object.status == "voting"){
            //get latest revision and check whether the user has already voted
            this.transcriba.loadLatestRevision(this.object.id).then(
              latestRevision => {
                this.voting.loadVote(latestRevision).then(
                  vote => {
                    this.hasVoted = vote != "none"
                    this.contents = [stableRevision.content, latestRevision.content];
                    this.labels = ['Alt', 'Neu'];
                    this.editable = false;
                    this.latestRevision = latestRevision;
                  },
                  err => console.log("couldn't load vote", err)
                );
                this.voting.loadVotings(latestRevision.id).then(
                  votings => this.votings = votings,
                  err => console.log(err)
                );
              },
              err => console.log("can't load revision data", err)
            );
          }else if(this.object.status == "free"){
            this.contents = [stableRevision.content];
            this.editable = false;
          }
        },
        err => console.log("can't load revision data", err)
      );

    }
  }
}
