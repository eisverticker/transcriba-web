import { Component, OnInit, Input} from '@angular/core';

import { TranscribaObject } from '../transcriba/transcriba-object';
import { TranscribaService } from '../transcriba/transcriba.service';

@Component({
  moduleId:     module.id,
  selector:    'transcription-editor',
  templateUrl: 'transcription-editor.component.html',
  styleUrls: []
})
export class TranscriptionEditorComponent implements OnInit{

  constructor(
    private transcriba: TranscribaService
  ){}

  ngOnInit(){
    //
  }


}
