import { Component, OnInit, Input} from '@angular/core';

import { TranscribaObject } from '../transcriba-object';
import { Revision } from '../revision';

import { TranscribaService } from '../transcriba.service';
import { DocumentService } from './document.service';

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
    private transcriba: TranscribaService,
    private docs: DocumentService
  ){}

  ngOnInit(){
    this.transcriba.loadByID(this.objectId).then(
      object => this.object = object,
      err => console.log(err)
    );
    this.transcriba.loadRevision(this.objectId).then(
      revision => {
        console.log("revision", revision);
        this.revision = revision
      },
      err => console.log(err)
    );
  }

  save(){
    this.docs.saveUnsavedChanges();
    console.log("saving", this.revision.content);
  }

  publish(){

  }


}
