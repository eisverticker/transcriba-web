import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  private logs: Array<any>;

  constructor() {
    this.logs = [];
  }

  log(context: string, message: any) {
    this.logs.push(context + ':' + message);
    console.log(context, message);
  }

  printLogs() {
    console.log(this.logs);
  }

}
