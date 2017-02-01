/**
 * VotingContext is a composite identifier which consists of
 * objectType (usually modelName like Comment or Revision)
 * and objectId (identifier of an entity in the objectType relation)
 */
export class VotingContext {
  constructor(
    public objectType: string,
    public objectId: any
  ) {}
}
