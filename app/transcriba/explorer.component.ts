import { Component, OnChanges, OnInit, Input} from '@angular/core';

import { Collection } from './collection';
import { TranscribaObject } from './transcriba-object';
import { TranscribaService } from './transcriba.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId:     module.id,
  selector:    'transcriba-explorer',
  templateUrl: 'explorer.component.html',
  styleUrls: []
})
export class ExplorerComponent implements OnChanges, OnInit{
  @Input() activeCollection: Collection = null;

  public collections: Array<Collection>;
  public objects: Array<TranscribaObject>;

  public items: Array< { title: string, id: string } >[];
  public isLoading: boolean = true;
  public itemType: string = "collection";
  public searchTerm: string = "";
  public currentPage: number = 0;


  constructor(
    private transcriba: TranscribaService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnChanges(){
    this.updateData();
  }

  ngOnInit(){
    this.updateData();
  }

  setItemType(type: string){
    this.currentPage = 0;
    this.itemType = type;
    this.updateData();
  }

  private updateData(){
    this.isLoading = true;
    if( this.activeCollection === null ){
      if(this.itemType == "collection"){
        return this.transcriba.loadCollectionPage(this.currentPage, 10).then(
          collections => {
            this.isLoading = false;
            this.items = collections.reduce(
              (last, current) => {
                let item = {
                  title: current.name,
                  id: "57f61b035df32221a10083b0"
                };

                let group = last.length-1;

                if( last[group].length === 3 ){
                  last.push([]);
                  group++;
                }

                last[group].push(item);
                return last;
              }
            ,[[]]);
          },
          err => this.isLoading = false
        );
      }else if(this.itemType == "object"){
        return this.transcriba.loadObjectPage(this.currentPage, 10).then(
          collections => {
            this.isLoading = false;
            this.items = collections.reduce(
              (last, current) => {
                let item = {
                  title: current.title,
                  id: current.id
                };

                let group = last.length-1;

                if( last[group].length === 3 ){
                  last.push([]);
                  group++;
                }

                last[group].push(item);
                return last;
              }
            ,[[]]);
          },
          err => this.isLoading = false
        );
      }

    }else{
      throw "not implemented";
    }

  }

}
