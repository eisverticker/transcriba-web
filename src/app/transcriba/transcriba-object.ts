export class TranscribaObject {
  static createEmptyObject() {
    return new TranscribaObject('', '', '', '');
  }

  constructor(
    public title: string,
    public externalID: string,
    public sourceID: any,
    public discussionID: any,
    public id?: any,
    public status?: string,
    public stage?: number
  ) {}

}
