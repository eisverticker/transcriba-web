import { Role } from './role';

export class User{
  constructor(
    public name: string,
    public mail: string,
    public password: string,
    public roles: Array<Role> = [],
    public id?: any
  ){};

  static createEmptyUser(): User{
    return new User("","","",[]);
  }

  static createGuest(): User{
    return new User("Guest", "", "", []);
  }

  static isGuest(user: User){
    return user.name == "Guest";
  }

  public isRegistered(){
    return this.hasOneOfTheseRoles(Role.getAvailableRoles().map(
      (role) => role.name
    ));
  }

  public isAdministrator(){
    return this.hasRole('administrator');
  }

  private hasOneOfTheseRoles(roleNames: Array<string>){
    return this.roles.reduce(
      (result, currentElement) => {
        return result || ( roleNames.indexOf(currentElement.name) !== -1 );
      }, false
    );
  }

  public hasRole(roleName){
    return this.hasOneOfTheseRoles([roleName]);
  }
}
