import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    user: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(private UsersService: UsersService, private fb: FormBuilder) { }
  ngOnInit(): void { }

  onClickSubmit() {
    this.UsersService.doLoginCall(this.loginForm.value.user, this.loginForm.value.password);
  }
}
