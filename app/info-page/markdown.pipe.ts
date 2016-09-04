import { Pipe } from '@angular/core';

@Pipe({ name: 'markdown' })
export class MarkdownPipe {

  constructor() {}

  transform(value) {
    //To-Do: add a markdown parser
    return value;
  }

}
