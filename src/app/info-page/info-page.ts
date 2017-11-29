export class InfoPage {
  static createEmptyPage() {
    return new InfoPage('', '', true);
  }

  constructor(
    public name: string,
    public content: string,
    public show_discussion: boolean,
    public discussionID?: any,
    public id?: any
  ) {}
}
