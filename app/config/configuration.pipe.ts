import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Pipe({ name: 'config' })
export class ConfigurationPipe implements PipeTransform {

  constructor(private config: ConfigurationService) {}

  transform(value: string) {
    return this.config.get(value, undefined);
  }

}
