import { Component, OnInit, Input} from '@angular/core';

import { Collection } from './collection';
import { TranscribaObject } from './transcriba-object';
import { TranscribaService } from './transcriba.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';
import { BackendHelper } from '../utilities/backend-helper';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId:     module.id,
  selector:    'transcriba-explorer',
  templateUrl: 'explorer.component.html',
  styleUrls: []
})
export class ExplorerComponent implements OnInit{
  collections: Array<Collection> = [];
  objects: Array<TranscribaObject[]> = [[]];

  navItems: Array<any>;

  isLoading: boolean = true;
  activeSearchTerm: string = "";
  searchTerm: string = "";
  currentPage: number = 0;
  numOfItems: number = 0;
  numOfPages: number = 1;
  itemsPerPage: number = 12;
  mode: string = "object";
  collectionId: any;


  constructor(
    private transcriba: TranscribaService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public backend: BackendHelper
  ){}

  ngOnInit(){
    this.initNavigation();
    this.route.data.subscribe( data => {
      this.route.params.subscribe(
        params => {
          this.mode = data['mode'];
          if(this.mode == 'insideCollection'){
            this.collectionId = params['id'];
          }
          this.updateData();
        }
      );
    });
  }

  setPage(page: number){
    this.currentPage = page;
    this.updateData();
  }

  private setNumberOfPages(){
    this.numOfPages = Math.ceil(this.numOfItems/this.itemsPerPage);
  }

  find(){
    if(this.searchTerm != this.activeSearchTerm){
      this.currentPage = 0;
      this.activeSearchTerm = this.searchTerm;
      this.updateData();
    }
  }

  private columnify(last: any, current: any){
      let group = last.length - 1;

      if( last[group].length === 3 ){
        last.push([]);
        group++;
      }

      last[group].push(current);
      return last;
  }

  private updateData(){
    this.isLoading = true;

    let searchValue: string;

    if(this.searchTerm.length < 2){
      searchValue = undefined;
    }else{
      searchValue = this.searchTerm;
    }
    // Create usable columnified (multi array) data from collection and transcribaObject objects
    if(this.mode == "collection"){
      return this.transcriba.loadCollectionPage(this.currentPage, this.itemsPerPage*2).then(
        collections => {
          this.collections = collections;
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }else if(this.mode == "object"){
      return this.transcriba.loadObjectCount(searchValue).then(
        count => {
          this.numOfItems = count;
          this.setNumberOfPages();
          return this.transcriba.loadObjectPage(this.currentPage, this.itemsPerPage, searchValue).then(
            objects => {
              this.objects = objects.reduce(this.columnify,[[]]);
              console.log(this.objects)
              this.isLoading = false;
            },
            err => {
              console.log(err);
              this.isLoading = false;
            }
          );

        },
        err => console.log(err)
      )

    }else if(this.mode == "insideCollection"){
      return this.transcriba.loadObjectPageFromCollection(this.currentPage, this.itemsPerPage, this.collectionId).then(
        objects => {
          this.objects = objects.reduce(this.columnify,[[]]);
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }


  }

  private initNavigation(){

    this.navItems = [
      /*{
        name: "general.collections",
        route: '/explore'
      },*/
      {
        name: "general.objects",
        route: '/explore'
      }
    ];

  }

}
