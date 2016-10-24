import { TeiElement } from '../editor/tei-element';

export class Revision{
  constructor(
    public id:any,
    public status: number,
    public createdAt: any,
    public metadata: any,
    public content: TeiElement,
    public published: boolean
  ){}

}
