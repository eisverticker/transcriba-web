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

let objectDummies: Array<TranscribaObject> = [
  new TranscribaObject("Test1", "32223","a","b", "sddsf24332"),
  new TranscribaObject("Test2", "32d223","a","b", "sddsfdf24332"),
  new TranscribaObject("Test3", "322d23a","a","b", "sdsafddsf24332"),
  new TranscribaObject("Test4", "32223s","a","b", "sddsf24dsf332")
];

let collectionDummies: Array<Collection> = [
  new Collection("Test1", "Hello Hello Hello", true, false, "32332adv"),
  new Collection("Test2", "Hello Hello Hello2", true, false, "32332adv3"),
  new Collection("Test3", "Hello Hello Hello3", true, false, "32332adv4"),
  new Collection("Test4", "Hello Hello Hello4", true, false, "32332adv5")
];

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
      o => new TranscribaObject(o.title, o.externalID, o.sourceId, o.discussionId, o.id)
    );
  }

  delete(obj: TranscribaObject): Promise<any>{
    return Promise.resolve(null);
  }

  loadParticipatingUsers(user: User): Promise<User[]>{
    return Promise.resolve([
      new User("schweinchenkopf", "s@skholding.com", "", [], "32r33r")
    ]);
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
    let token = this.auth.token;
    let url = this.backend.authUrl(
      'TranscribaObjects',
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
    return Promise.resolve(collectionDummies);
  }

  loadNumOfZoomLevels(id: any): Promise<number>{
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/'+id+'/zoomsteps', token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise();
  }

  loadRevision(objId: any): Promise<Revision>{
    return Promise.resolve(new Revision(
      "dsaasdf233232423",
      0,
      new Date(),
      {},
      TeiElement.fromObject(
        {
        type: "root",
        properties: {},
        children: [
          {
            type: "page",
            properties: {},
            children: [
              {
                type: "paragraph",
                properties: {},
                children: [
                  {
                    type: "line",
                    properties: {},
                    children: [
                      {
                        type: "textPartOrdinary",
                        properties: {
                          value: "Gewöhnlicher "
                        },
                        children: []
                      },
                      {
                        type: "textPartDeleted",
                        properties: {
                          value: "Test"
                        },
                        children: []
                      },
                      {
                        type: "textPartOrdinary",
                        properties: {
                          value: "Text"
                        },
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ),
      false
    ));
  }

}
