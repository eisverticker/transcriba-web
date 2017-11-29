import { environment } from '../../environments/environment';

export class Role {
  constructor(
    public name: string,
    public id?: any
  ) {}

  static getAvailableRoles(): Array<Role> {
    if (environment.roles === undefined) {
      return [
        new Role('registered'),
        new Role('administrator')
      ];
    }else {
      return environment.roles.map( role => new Role(role) );
    }
  }
}
