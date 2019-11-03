import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';


@Injectable()
export class ImageViewerService {

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  loadNumOfZoomLevels(id: any): Promise<number> {
    let token = this.auth.token;
    let url = this.backend.authUrl('TranscribaObjects/' + id + '/zoomsteps', token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise();
  }


}
