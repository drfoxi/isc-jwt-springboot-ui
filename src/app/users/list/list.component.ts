import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '@app/@services';
import {InvocationContext} from '@app/@models/invocationContext';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  users = null;

  constructor(private accountService: AccountService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.accountService.getAllUsers().pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.users = [];
          ic.data.forEach(data => {
            (data.userRole == 1) ? data['UserRoleDesc'] = 'Admin' : data['UserRoleDesc'] = 'User';
            this.users.push(data);
          });
        } else {
          this.alertService.error(ic.errorMessage);
        }
      });
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    const currentUser = this.accountService.userValue;

    if (user.id != currentUser.id) {
      user.isDeleting = true;
      this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => {
          this.users = this.users.filter(x => x.id !== id);
        });
    }else{
      this.alertService.clear();
      this.alertService.error('امکان حذف یوزر جاری وجود ندارد.');
    }
  }

}
