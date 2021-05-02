import {Component} from '@angular/core';
import {AccountService} from './@services';
import {User} from './@models';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent {
  user: User;
  isAdmin = false;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    if (this.accountService.getUserRole() === 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  message: string;

  receiveMessage($event) {
    this.message = $event;
    console.log(this.message);
  }
  logout() {
    this.accountService.logout();
  }
}
