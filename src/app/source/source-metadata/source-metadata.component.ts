import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggerService } from '../../utility/logger.service';
import { SourceService } from '../source.service';
import { Source } from '../source';

@Component({
  selector: 'src-source-metadata',
  templateUrl: './source-metadata.component.html',
  styleUrls: ['./source-metadata.component.scss']
})
export class SourceMetadataComponent implements OnInit {
  @Output() done = new EventEmitter<Source>();
  @Output() abort = new EventEmitter<void>();

  public metadataUrl = '';
  public isLoading = false;

  constructor(
    private logger: LoggerService,
    private sourceService: SourceService
  ) { }

  ngOnInit() {}

  importMetadata() {
    this.isLoading = true;
    return this.sourceService.loadMetadata(this.metadataUrl).then(
      (source) => {
        this.done.emit(source);
        this.isLoading = false;
      },
      (error) => {
        this.logger.log('source loaded', 'error');
        this.isLoading = false;
      }
    );
  }

  abortImport() {
    this.abort.emit(null);
  }

}
