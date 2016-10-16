import { Component, OnInit, Input} from '@angular/core';

import { TranscribaObject } from '../transcriba-object';
import { Revision } from '../revision';

import { TranscribaService } from '../transcriba.service';

@Component({
  moduleId:     module.id,
  selector:    'transcription-editor',
  templateUrl: 'transcription-editor.component.html',
  styleUrls: []
})
export class TranscriptionEditorComponent implements OnInit{

  objectId: any = "58020f80d7a15d2105ee76f8";
  object: TranscribaObject;
  revision: Revision;

  constructor(
    private transcriba: TranscribaService
  ){}

  ngOnInit(){
    this.transcriba.loadByID(this.objectId).then(
      object => this.object = object,
      err => console.log(err)
    )
  }


}
