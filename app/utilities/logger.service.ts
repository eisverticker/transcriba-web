import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService{
  private logs: string[];

  constructor(){
    this.logs = [];
  }

  log(message: string){
    this.logs.push(message);
    console.log(message);
  }

  printLogs(){
    console.log(this.logs);
  }


}
