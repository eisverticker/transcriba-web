export class Comment{
  constructor(
    public content: string,
    public id?: any
  ){}

  static createEmptyComment(){
    return new Comment("");
  }
}
