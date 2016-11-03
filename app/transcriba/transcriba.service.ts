import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

import { Injectable } from '@angular/core';
import { TranscribaObject } from './transcriba-object';
import { Revision } from './revision';
import { Collection } from './collection';
import { Source } from '../source/source';

import { TeiElement } from '../editor/tei-element';


@Injectable()
export class TranscribaService{

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ){}

  loadByID(id: any): Promise<TranscribaObject>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+id, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      o => {
        return new TranscribaObject(
          o.title,
          o.externalID,
          o.sourceId,
          o.discussionId,
          o.id,
          o.status
        )
      }
    );
  }

  delete(obj: TranscribaObject): Promise<any>{
    throw "not implemented yet";
  }

  loadParticipatingUsers(user: User): Promise<User[]>{
    throw "not implemented yet";
  }

  saveObject(obj: TranscribaObject): Promise<any>{
    return Promise.resolve(null);
  }

  loadCollectionByID(id: any): Promise<Collection>{
    return Promise.resolve(Collection.createEmptyCollection());
  }

  saveCollection(collection: Collection): Promise<any>{
    return Promise.resolve(null);
  }

  import(source: Source, foreignID: string): Promise<string>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/import', token);

    return this.http.post(url, {
      'sourceId': source.id,
      'externalId': foreignID
    })
    .map(data => data.json())
    .toPromise();
  }

  addObjectToCollection(target: Collection, obj: TranscribaObject): Promise<any>{
    return Promise.resolve(null);
  }

  addCollectionToCollection(target: Collection, item: Collection): Promise<any>{
    return Promise.resolve(null);
  }

  loadObjectPage(page: number, itemsPerPage: number, searchTerm?: string, rootCollection?: Collection): Promise<TranscribaObject[]>{
    let searchFilter: string;
    if(searchTerm && searchTerm.length > 1){
      searchFilter = "&filter[where][title][like]="+searchTerm;
    }else{
      searchFilter = "";
    }

    let token = this.auth.token;
    let url = this.backend.authUrl(
      'TranscribaObjects',
      token,
      "filter[order]=createdAt DESC"+
      searchFilter+
      //"&filter[include]=appUser"
      "&filter[limit]="+itemsPerPage+"&filter[skip]="+itemsPerPage*page
    );

    return this.http.get(url)
    .timeout(5000, "Timeout")
    .map(data => data.json())
    .toPromise()
    .then(
      (objects) => {
        return objects.map(
          (data) => {
            return new TranscribaObject(data.title, data.externalID, data.sourceId, data.discussionId, data.id);
          }
        );
      }
    );
  }

  loadObjectPageFromCollection(page: number, itemsPerPage: number, collectionId: any, searchTerm?: string): Promise<TranscribaObject[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl(
      'Collections/'+collectionId+'/transcribaObjects',
      token,
      "filter[order]=createdAt DESC"+
      //"&filter[include]=appUser"
      "&filter[limit]="+itemsPerPage+"&filter[skip]="+itemsPerPage*page
    );

    return this.http.get(url)
    .timeout(5000, "Timeout")
    .map(data => data.json())
    .toPromise()
    .then(
      (objects) => {
        return objects.map(
          (data) => {
            return new TranscribaObject(data.title, data.externalID, data.sourceId, data.discussionId, data.id);
          }
        );
      }
    );
  }

  loadCollectionPage(page: number, itemsPerPage: number, rootCollection?: Collection): Promise<Collection[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl(
      'Collections',
      token,
      "filter[order]=createdAt DESC"+
      //"&filter[include]=appUser"
      "&filter[limit]="+itemsPerPage+"&filter[skip]="+itemsPerPage*page
    );

    return this.http.get(url)
    .timeout(5000, "Timeout")
    .map(data => data.json())
    .toPromise()
    .then(
      (collections) => {
        console.log(collections);
        return collections.map(
          (data) => {
            return new Collection(data.name, data.description, data.public, data.locked, data.id);
          }
        );
      }
    );
  }

  loadNumOfZoomLevels(id: any): Promise<number>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+id+'/zoomsteps', token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise();
  }

  /**
   * Loads the revision chronic of a TranscribaObject with the given id
   */
  loadChronic(objId: any): Promise<Array<{id: string, username: string, createdAt: string, published: boolean, approved: boolean}>>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+objId+'/chronic',token);

    return this.http.get(url)
    .timeout(5000, "Timeout")
    .map(data => data.json())
    .toPromise();
  }

  /*loadNumOfRevisions(objId: any): Promise<number>{
    return Promise.resolve(0);
  }*/

  loadLatestRevision(objId: any): Promise<Revision>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+objId+'/latest',token);

    return this.http.get(url)
    .timeout(5000, "Timeout")
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

  loadStableRevision(objId: any): Promise<Revision>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+objId+'/stable',token);

    return this.http.get(url)
    .timeout(5000, "Timeout")
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

  loadLatestRevisionPermissions(objId: any): Promise<{allowVote: boolean, details: any}>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+objId+'/latest/permissions',token);

    return this.http.get(url)
    .timeout(5000, "Timeout")
    .map(data => data.json())
    .toPromise();
  }


}
