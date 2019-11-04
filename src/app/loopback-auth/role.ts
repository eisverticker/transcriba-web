import { configData } from '../config';

export class Role {
  constructor(
    public name: string,
    public id?: any
  ) {}

  static getAvailableRoles(): Array<Role> {
    if (configData.roles === undefined) {
      return [
        new Role('registered'),
        new Role('administrator')
      ];
    } else {
      return configData.roles.map( role => new Role(role) );
    }
  }
}
