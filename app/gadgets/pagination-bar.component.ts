import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId:     module.id,
  selector:    'pagination-bar',
  templateUrl: 'pagination-bar.component.html',
  styleUrls: [],
  providers: []
})
export class PaginationBarComponent implements OnChanges{

  public pages: Array<number> = [];

  @Input() currentPage: number;
  @Input() numOfPages: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(){}

  ngOnChanges(){
    for(let i = 0; i < this.numOfPages; i++){
      this.pages.push(i);
    }
  }

  getPageWidth(){
    return (100/this.numOfPages).toString() + "%";
  }

  openPage(page: number){
    this.pageChanged.emit(page);
  }

}
