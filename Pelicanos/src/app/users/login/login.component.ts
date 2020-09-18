import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fgValidation: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  email: string = '';
  password: string = '';

  
  ngOnInit() {
    this.fgValidationBuilder();
  }

  fgValidationBuilder() {
    this.fgValidation = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    });
  }

  loginEvent(){
    if(this.fgValidation.invalid){
      alert("Invalid data.");
    }else{
      let u = this.fg.username.value;
      let p = this.fg.password.value;
      let user = null;
      this.userService.loginUser(u,p).subscribe(data =>{
        if(data != null){
          console.log(user);
          this.userService.saveUserInformation(data);
          this.userService.saveToken(data.id);
          this.router.navigate(['/home']);
        }else{
          alert("the data is not valid")
        }
      })
      
    }
  }

  get fg(){
    return this.fgValidation.controls;
  }


}
