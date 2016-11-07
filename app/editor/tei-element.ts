export class TeiElement{

  public isValid: boolean = true;
  public isFocused: boolean = false;

  constructor(
    public type: string,
    public properties: any,
    public children: Array<TeiElement> = [],
    public isDirty: boolean = false
  ){

  }

  static fromObject(obj): TeiElement{
    let children: Array<TeiElement> = obj.children.map(
      child => TeiElement.fromObject(child)
    );

    return new TeiElement(
      obj.type,
      obj.properties,
      children,
      obj.isDirty
    )
  }

}
