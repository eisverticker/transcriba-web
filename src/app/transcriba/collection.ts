export class Collection {

  static createEmptyCollection() {
    return new Collection('', '', true, false);
  }

  constructor(
    public name: string,
    public description: string,
    public isPublic: boolean,
    public isLocked: boolean,
    public id?: any
  ) {}

}
