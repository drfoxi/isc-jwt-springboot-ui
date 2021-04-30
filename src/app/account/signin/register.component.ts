import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService, AlertService} from '@app/@services';
import {environment} from '@environments/environment';
import {InvocationContext} from '@app/@models/invocationContext';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  form: FormGroup;
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
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      channel: environment.channel
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (!this.form.invalid) {
      this.loading = true;
      this.accountService.register(this.form.value)
        .pipe()
        .subscribe(value => {
          const ic: InvocationContext = value;
          if (ic.errorCode === 0) {
            this.alertService.success(ic.errorMessage, {keepAfterRouteChange: true});
            this.router.navigate(['../login'], {relativeTo: this.route});
          } else {
            this.alertService.error(ic.errorMessage);
            this.loading = false;
          }
        });
    }
  }
}
