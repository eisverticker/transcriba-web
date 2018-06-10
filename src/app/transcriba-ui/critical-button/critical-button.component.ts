import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tui-critical-button',
  templateUrl: './critical-button.component.html',
  styleUrls: ['./critical-button.component.scss']
})
export class CriticalButtonComponent {
  @Input() type: string;
  @Output() xclick: EventEmitter<any> = new EventEmitter();
  @Input() disabled: any;

  constructor(
    private translate: TranslateService
  ) { }

  clicked() {
    let messageTranslationKey: string;

    switch (this.type) {
      default:
        messageTranslationKey = 'message.confirmDelete';
    }

    this.translate.get(messageTranslationKey).subscribe(
      (isConfirmed) => {
        if (confirm(isConfirmed) === true) {
          this.xclick.emit(null);
        }
      }
    );
  }

}
