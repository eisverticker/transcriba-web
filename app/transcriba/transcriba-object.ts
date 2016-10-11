export class TranscribaObject{
  constructor(
    public title: string,
    public externalID: string,
    public sourceID: any,
    public discussionID: any,
    public id?: any
  ){

  }

  static createEmptyObject(){
    return new TranscribaObject("", "","","")
  }

}
