import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  moduleId:     module.id,
  selector:    'delete-button',
  templateUrl: 'delete-button.component.html',
  styleUrls: [],
  providers: []
})
export class DeleteButtonComponent{
  @Output() xclick: EventEmitter<any> = new EventEmitter();
  @Input() disabled: any;

  constructor(private translate: TranslateService){}

  ngOnInit(){}

  clicked(){
    this.translate.get('message.confirmDelete').subscribe(
      (confirmDelete) => {
        if(confirm(confirmDelete) === true){
          this.xclick.emit(null);
        }
      }
    );
  }

}
