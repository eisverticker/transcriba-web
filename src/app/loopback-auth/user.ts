import { Role } from './role';

export class User {
  static createEmptyUser(): User {
    return new User('', '', '', []);
  }

  static createGuest(): User {
    return new User('Guest', '', '', []);
  }

  static isGuest(user: User) {
    return user.name === 'Guest';
  }

  constructor(
    public name: string,
    public mail: string,
    public password: string,
    public roles: Array<Role> = [],
    public id?: any,
    public completedTutorial?: boolean
  ) {};

  public equals(user: User): boolean {
    return this.name === user.name;
  }

  public isRegistered() {
    return this.hasOneOfTheseRoles(Role.getAvailableRoles().map(
      (role) => role.name
    ));
  }

  public isAdministrator() {
    return this.hasRole('administrator');
  }

  public isEmployee() {
    return this.hasRole('employee');
  }

  public isTrusted() {
    return this.hasRole('trusted');
  }

  public hasRole(roleName) {
    return this.hasOneOfTheseRoles([roleName]);
  }

  private hasOneOfTheseRoles(roleNames: Array<string>) {
    return this.roles.reduce(
      (result, currentElement) => {
        return result || ( roleNames.indexOf(currentElement.name) !== -1 );
      }, false
    );
  }

}
