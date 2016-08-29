import { Component, OnInit} from '@angular/core';

import { Source } from './source';
import { SourceService } from './source.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId:     module.id,
  selector:    'source-details',
  templateUrl: 'source-details.component.html',
  styleUrls: [],
  providers: []
})
export class SourceDetailsComponent implements OnInit{

  public source: Source = new Source("test","test", "transcribajson",true, false);
  public isSaving: boolean = false;

  constructor(
    private sourceService: SourceService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.route.params.subscribe(
      (params) => {
        if(params['id'] === "new"){
          this.source = Source.createEmptySource();
        }else{
          this.sourceService.loadSourceByID(params['id']).then(
            (data) => this.source = new Source(data.title, data.url, data.type, data.sync, data.activated, data.id),
            (err) => {
              this.notify.notify(new Notification('request.fail', ['fail']));
              this.router.navigate(['/sources']);
            }
          );
        }
      }
    );
  }

  save(){
    this.isSaving = true;
    this.sourceService.save(this.source).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.router.navigate(['/sources']);
        this.isSaving = false;
      },
      (err) => {
        this.notify.notify(new Notification('request.fail', ['fail']));
        this.isSaving = false;
      }
    );
  }

}
