import { Component } from '@angular/core';

@Component({
  selector: 'element-details',
  template:
  `
    <div>Transkription bearbeiten</div>
    <div><input class="form-control" placeholder="Hier text ändern" /></div>
  `
})
export class DetailComponent{
  constructor(){
    console.log("Detail erstellt");
  }
}
