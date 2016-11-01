export class TranscribaObject{
  constructor(
    public title: string,
    public externalID: string,
    public sourceID: any,
    public discussionID: any,
    public id?: any,
    public status?: string
  ){

  }

  static createEmptyObject(){
    return new TranscribaObject("", "","","")
  }

}
