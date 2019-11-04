import { environment } from 'src/environments/environment';

export class Role {
  constructor(
    public name: string,
    public id?: any
  ) {}

  static getAvailableRoles(): Array<Role> {
    if (environment.rbac.roles === undefined) {
      return [
        new Role('registered'),
        new Role('administrator')
      ];
    } else {
      return environment.rbac.roles.map( role => new Role(role) );
    }
  }
}
