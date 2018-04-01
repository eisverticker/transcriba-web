import { Injectable } from '@angular/core';
import { LoggerFactory, LFService } from 'typescript-logging';

/* tslint:disable:no-console */
@Injectable()
export class LoggerService {
  static loggerFactory = LFService.createLoggerFactory();

  private logs: Array<any>;

  constructor() {
    this.logs = [];
  }

  static getCustomLogger(category: string) {
    const logger = this.loggerFactory.getLogger(category);
    return logger;
  }

  log(context: string, message: any) {
    this.logs.push(context + ':' + message);
    console.log(context, message);
  }

  error(context: string, message: any) {
    this.logs.push(context + ':' + message);
    console.error(context, message);
  }

  printLogs() {
    console.log(this.logs);
  }

}
