import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from '../loopback-auth/auth.service';

@Injectable()
export class ImageViewerService {

  constructor(
    private http: HttpClient,
    private backendService: BackendService,
    private authService: AuthService
  ) { }

  loadNumOfZoomLevels(id: any): Promise<number> {
    const token = this.authService.token;
    const url = this.backendService.authUrl('TranscribaObjects/' + id + '/zoomsteps', token);

    return this.http.get<number>(url)
    .toPromise();
  }

}
