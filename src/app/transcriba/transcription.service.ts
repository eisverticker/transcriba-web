import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Revision } from './revision';

import { TeiElement } from '../editor/tei-element';

@Injectable()
export class TranscriptionService {

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  /**
   * Tries to start the Transcription which means
   * that it occupies the object and fetchen the data of the
   * new cloned revision (which the user has write permissions to)
   */
  start(objId: any): Promise<Revision> {
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/' + objId + '/occupy', token);

    return this.http.post(url, {})
    .map(data => data.json())
    .toPromise()
    .then(
      data => new Revision(
        data.id,
        data.approved,
        data.createdAt,
        data.metadata,
        data.content,
        data.published,
        data.ownerId
      )
    );
  }

  /**
   * Saves editor data to the latest revision
   */
  save(objId: any, content: TeiElement): Promise<any> {
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/' + objId + '/save', token);

    return this.http.post(url, content)
    .map(data => data.json())
    .toPromise();
  }

  /**
   * Finish the work on the current revision
   */
  publish(objId: any, content: TeiElement): Promise<any> {
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/' + objId + '/publish', token);

    return this.http.post(url, content)
    .map(data => data.json())
    .toPromise();
  }

  /**
   * Aborts the transcription of the current user
   * (deletes revision and frees object/user)
   */
  abort(): Promise<any> {
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/free', token);

    return this.http.post(url, {})
    .map(data => data.json())
    .toPromise();
  }

}
