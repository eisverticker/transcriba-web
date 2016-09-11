import { User } from '../loopback-auth/user';

export class Comment{
  constructor(
    public content: string,
    public user?: User,
    public createdAt?: string,
    public id?: any
  ){}

  static createEmptyComment(){
    return new Comment("");
  }
}
