import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ImageViewerService {

  constructor(
    private http: HttpClient,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  loadNumOfZoomLevels(id: any): Promise<number> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + id + '/zoomsteps', token);

    return this.http.get<number>(url)
    .toPromise();
  }


}
