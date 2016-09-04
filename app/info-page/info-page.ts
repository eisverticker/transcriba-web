export class InfoPage{
  constructor(
    public name: string,
    public content: string,
    public id?: any
  ){}

  static createEmptyPage(){
    return new InfoPage("","");
  }
}
