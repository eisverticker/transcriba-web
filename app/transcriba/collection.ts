export class Collection{
  constructor(
    public name: string,
    public description: string,
    public isPublic: boolean,
    public isLocked: boolean,
    public id?: any
  ){

  }

  static createEmptyCollection(){
    return new Collection("", "", true, false);
  }

}
