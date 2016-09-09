import { Comment } from './comment';

export class Discussion{
  private

  constructor(
    public title: string,
    public id?: any
  ){}

  static createEmptyDiscussion(){
    return new Discussion("", []);
  }
}
