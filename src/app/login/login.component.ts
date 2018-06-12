import { Component, OnInit } from '@angular/core';
import { userService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {

  public frm: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;

  constructor(
    private api: userService,
    private auth: authService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public doSignIn() {

    // Make sure form values are valid
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

    // Submit request to API
    this.api
      .signIn(username, password)
      .subscribe(
        (response) => {
        	console.log('retour de l api pour le token');
        	console.log(response)
          this.auth.doSignIn(
            response['token'],
            response['name']
          );
          this.router.navigate(['exercises']);
        },
        (error) => {
          this.isBusy = false;
          this.hasFailed = true;
        }
      );
  }

}