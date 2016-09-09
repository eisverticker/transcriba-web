export class Source{
  constructor(
    public title: string,
    public url: string,
    public type: string,
    public sync: boolean,
    public activated: boolean,
    public id?: any
  ){}

  static createEmptySource(){
    return new Source("","","transcribajson",false, true)
  }
}