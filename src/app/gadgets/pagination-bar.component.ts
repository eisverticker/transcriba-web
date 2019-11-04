import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

@Component({
  selector:    'ut-pagination-bar',
  templateUrl: 'pagination-bar.component.html',
  styleUrls: []
})
export class PaginationBarComponent implements OnChanges {

  public pages: Array<number> = [];

  @Input() currentPage: number;
  @Input() numOfPages: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    this.pages = [];
    for (let i = 0; i < this.numOfPages; i++) {
      this.pages.push(i);
    }
  }

  getPageWidth() {
    return (100 / this.numOfPages).toString() + '%';
  }

  openPage(page: number) {
    this.pageChanged.emit(page);
  }

}
