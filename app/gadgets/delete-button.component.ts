import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  moduleId:     module.id,
  selector:    'ut-delete-button',
  templateUrl: 'delete-button.component.html',
  styleUrls: []
})
export class DeleteButtonComponent {
  @Output() xclick: EventEmitter<any> = new EventEmitter();
  @Input() disabled: any;

  constructor(private translate: TranslateService) {}

  clicked() {
    this.translate.get('message.confirmDelete').subscribe(
      (confirmDelete) => {
        if (confirm(confirmDelete) === true) {
          this.xclick.emit(null);
        }
      }
    );
  }

}
