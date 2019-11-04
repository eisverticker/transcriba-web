import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigurationService {
  private localData: any;

  constructor() {
    this.localData = this.getLocalConfiguration();
  }

  get(key: string, dfault?: any): any {
    return this.localData[key] === undefined ? dfault : this.localData[key];
  }

  private getLocalConfiguration() {
    return {
      ...environment
    };
  }

}
