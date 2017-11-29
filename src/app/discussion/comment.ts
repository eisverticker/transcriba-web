import { User } from '../loopback-auth/user';

export class Comment {

  static createEmptyComment() {
    return new Comment('');
  }

  constructor(
    public content: string,
    public user?: User,
    public createdAt?: string,
    public id?: any
  ) {}
}
