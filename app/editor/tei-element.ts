export class TeiElement{

  public isValid: boolean = true;
  public isDirty: boolean = false;
  public isFocused: boolean = false;

  constructor(
    public type: string,
    public properties: any,
    public children: Array<TeiElement> = []
  ){

  }

  static fromObject(obj){
    let children: Array<TeiElement> = obj.children.map(
      child => TeiElement.fromObject(child)
    );

    return new TeiElement(
      obj.type,
      obj.properties,
      children
    )
  }

  static toObject(){

  }
}
