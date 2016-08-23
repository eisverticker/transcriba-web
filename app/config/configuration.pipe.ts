import { Pipe } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Pipe({ name: 'config' })
export class ConfigurationPipe {

  constructor(private config: ConfigurationService) {}

  transform(value) {
    return this.config.get(value, undefined);
  }

}
