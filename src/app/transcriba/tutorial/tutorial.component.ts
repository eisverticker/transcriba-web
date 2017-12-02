import { Component, OnInit } from '@angular/core';
import { TutorialItem } from './tutorial-item';

@Component({
  selector: 'tr-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  tutorialItems: Array<TutorialItem>;
  currentItem: TutorialItem;
  currentItemIdx: number;

  constructor() {
    this.tutorialItems = [
      {
        title: "Willkommen beim Transcriba-Tutorial!"
      },
      {
        title: "Zweck der Arbeit",
        imageFileName: "schiller.jpg",
        description: "Auf Transcriba hilfst du dabei die alte Handschrift auf den Manuskripten zu entschlüsseln und wissenschaftlich nutzbar zu machen. Auf dem Bild siehst du beispielsweise ein Manuskript von Friedrich Schiller (An die Freude)."
      },
      {
        title: "Hallo Welt",
        imageFileName: "tr2.png",
        description: "Hallo Welt Content"
      }
    ];
    this.currentItemIdx = 0;
    this.currentItem = this.tutorialItems[this.currentItemIdx];
  }

  ngOnInit() {
  }

  goToNextItem(){
    this.currentItemIdx++;
    this.currentItem = this.tutorialItems[this.currentItemIdx];
  }

  goToPreviousItem(){
    this.currentItemIdx--;
    this.currentItem = this.tutorialItems[this.currentItemIdx];
  }

  // TODO
  finishTutorial(){

  }

}
