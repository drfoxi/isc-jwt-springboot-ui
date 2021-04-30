import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, tap} from 'rxjs/operators';
import {AccountService, AlertService} from '@app/@services';
import {InvocationContext} from '@app/@models/invocationContext';
import {User} from '@app/@models';
import {Observable} from 'rxjs';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  navigate: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      channel: []
    });
  }

  get f() {
    return this.form.controls;
  }

  submitWebSite() {
    this.form.patchValue({channel: 60});
    this.onSubmit();
  }

  submitMobile() {
    this.form.patchValue({channel: 50});
    this.onSubmit();
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (!this.form.invalid) {
      this.loading = true;
      this.accountService.login(this.f.username.value, this.f.password.value, this.f.channel.value)// .pipe(first())
        .subscribe(data => {
            const ic: InvocationContext = data;
            const user: User = this.accountService.getDecodedAccessToken(ic.data).payload;
            localStorage.setItem('_auth_token', JSON.stringify(ic.data));
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
          },
          error => {
            this.alertService.error('خطا : username یا password اشتباه است! لطفا دوباره تلاش کنید.');
            this.loading = false;
          });
    }
  }
}
