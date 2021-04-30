import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '@app/@services';
import {InvocationContext} from '@app/@models/invocationContext';
import {environment} from '@environments/environment';

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      id: [this.id],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators],
      channel: environment.channel
    });

    if (!this.isAddMode) {

      this.accountService.getById(this.id).pipe()
        .subscribe(value => {
          const ic: InvocationContext = value;
          if (ic.errorCode === 0) {
            const users = ic.data;
            this.f.firstName.setValue(users.firstName);
            this.f.lastName.setValue(users.lastName);
            this.f.username.setValue(users.username);
          } else {
            this.alertService.error(ic.errorMessage);
          }
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {

    this.accountService.register(this.form.value)
      .pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.alertService.success(ic.errorMessage, {keepAfterRouteChange: true});
          this.router.navigate(['.', {relativeTo: this.route}]);
        } else {
          this.alertService.error(ic.errorMessage);
          this.loading = false;
        }
      });
  }

  private updateUser() {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.id === this.accountService.userValue.id) {
            const user = {...this.accountService.userValue, ...this.form.value};
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.alertService.success('Update successful', {keepAfterRouteChange: true});
          this.router.navigate(['..', {relativeTo: this.route}]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
