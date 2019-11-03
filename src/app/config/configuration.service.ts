import { Injectable } from '@angular/core';
import { configData } from '../config';

@Injectable()
export class ConfigurationService {
  private localData: any;

  constructor() {
    this.localData = this.getLocalConfiguration('config.json');
  }

  get(key: string, dfault?: any): any {
    return this.localData[key] === undefined ? dfault : this.localData[key];
  }

  private getLocalConfiguration(location: string) {
    return configData;
  }

}
