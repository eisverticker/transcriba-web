import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-experimental',
  templateUrl: './experimental.component.html',
  styleUrls: ['./experimental.component.scss']
})
export class ExperimentalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openSnackBar() {
    console.log("Hallo Welt");
  }

}
