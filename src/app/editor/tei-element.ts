export class TeiElement {

  public isValid = true;
  public isFocused = false;

  static fromObject(obj): TeiElement {
    const children: Array<TeiElement> = obj.children.map(
      child => TeiElement.fromObject(child)
    );

    return new TeiElement(
      obj.type,
      obj.properties,
      children,
      obj.isDirty
    );
  }

  constructor(
    public type: string,
    public properties: any,
    public children: Array<TeiElement> = [],
    public isDirty = false
  ) {}

}
