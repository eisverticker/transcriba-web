import { Observable, BehaviorSubject } from 'rxjs/Rx';

export abstract class PaginationComponent {

  protected paginator: BehaviorSubject<number>;
  protected pageChanged: Observable<number>;

  private _numOfItems: number;
  private _itemsPerPage: number;

  constructor(
    itemsPerPage = 12,
    numOfItems = 0
  ) {
    this.itemsPerPage = itemsPerPage;
    this.numOfItems = numOfItems;

    this.paginator = new BehaviorSubject<number>(0);
    this.pageChanged = this.paginator.asObservable();
  }

  // Custom Getter and Setter
  set numOfItems(value: number){
    this._numOfItems = value;
  }

  get numOfItems(): number{
    return this._numOfItems;
  }

  set itemsPerPage(value: number){
    this._itemsPerPage = value;
  }

  get itemsPerPage(): number{
    return this._itemsPerPage;
  }

  getNumOfPages(): number {
    return Math.ceil(this.numOfItems / this.itemsPerPage);
  }
}
