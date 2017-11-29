import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'tui-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBarComponent implements OnChanges {

  public pages: Array<number> = [];

  @Input() currentPage: number;
  @Input() numOfItems: number;
  @Input() itemsPerPage: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {}

  openPage(pageEvent: any) {
    // update itemsPerPage if changed
    if (this.itemsPerPage !== pageEvent.pageSize) {
      this.itemsPerPage = pageEvent.pageSize;
    }
    this.pageChanged.emit(pageEvent.pageIndex);
  }


}
