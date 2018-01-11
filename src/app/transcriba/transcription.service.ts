import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Revision } from './revision';

import { TeiElement } from '../editor/tei-element';

@Injectable()
export class TranscriptionService {

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private auth: AuthService
  ) {}

  /**
   * Tries to start the Transcription which means
   * that it occupies the object and fetchen the data of the
   * new cloned revision (which the user has write permissions to)
   */
  start(objId: any): Promise<Revision> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/occupy', token);

    return this.http.post(url, {})
    .toPromise()
    .then(
      data => new Revision(
        data['id'],
        data['approved'],
        data['createdAt'],
        data['metadata'],
        data['content'],
        data['published'],
        data['ownerId']
      )
    );
  }

  /**
   * Saves editor data to the latest revision
   */
  save(objId: any, content: TeiElement): Promise<any> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/save', token);

    return this.http.post(url, content)
    .toPromise();
  }

  /**
   * Finish the work on the current revision
   */
  publish(objId: any, content: TeiElement): Promise<any> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/publish', token);

    return this.http.post(url, content)
    .toPromise();
  }

  /**
   * Aborts the currently open transcription
   * (deletes revision and frees object/user)
   */
  abort(): Promise<boolean> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/free', token);

    return this.http.post(url, {})
    .toPromise();
  }


}
