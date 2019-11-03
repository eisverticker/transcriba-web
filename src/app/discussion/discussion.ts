export class Discussion {

  static createEmptyDiscussion() {
    return new Discussion('', []);
  }

  constructor(
    public title: string,
    public id?: any
  ) {}
}
