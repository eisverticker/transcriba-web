import { Component, OnInit} from '@angular/core';

import { User } from './user';
import { Role } from './role';
import { UserService } from './user.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'user-management',
  templateUrl: 'user-management.component.html',
  styleUrls: []
})
export class UserManagementComponent implements OnInit{
  public isReleased: boolean = true;
  public users: Array<User> = [];
  public roles: Array<Role> = [];
  public page: number = 0;
  public numOfPages: number;
  public isLocked: boolean = false;
  public itemsPerPage: number = 12;

  constructor(
    private userService: UserService,
    private notify: NotificationService
  ){}

  ngOnInit(){

    this.userService.loadRoles().then(
      roles => {
        roles.push(new Role('none'));
        this.roles = roles;
        return this.updateUserList();
      }
    ).then(
      () => this.isReleased = true
    );
  }

  setPage(page: number){
    this.page = page;
    this.updateUserList();
  }

  updateUserCount(): Promise<any>{
    return this.userService.loadUserCount().then(
      (count) => {
        this.numOfPages = Math.ceil(count/this.itemsPerPage);
      }
    );
  }

  updateUserList(): Promise<any>{
    return this.userService.loadUserPage(this.page, this.itemsPerPage).then(
      users => {
        this.users = users;
        return this.updateUserCount();
      }
    );
  }

  changeRole($event, user: User){
    return this.userService.giveUserRole(user, $event.target.value).then(
      () => this.notify.notify(new Notification("request.success", ['success'])),
      ()  => this.notify.notify(new Notification("request.fail", ['fail']))
    ).then(
      () => this.updateUserList()
    );
  }

  deleteUser(user: User){
    this.userService.delete(user).then(
      () => {
        this.notify.notify(
          new Notification("request.successfulRemoved", ['success'])
        );
        return this.updateUserList();
      }
        ,
      (err) => {
        this.notify.notify(new Notification("request.fail", ['fail']));
        return Promise.reject(err);
      }
    );
  }

}
