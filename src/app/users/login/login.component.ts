import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../material.module';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  errorMessage: string = '';
  public loginForm = new FormGroup({
    name: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private router:Router,
    private userService: UsersService

  ){}

  ngOnInit() {
  }

  logForm(){
    this.userService.login(this.loginForm.getRawValue()).subscribe({
      next:(response)=>{
        console.log('Inicio de sesión exitoso:', response);
        this.authService.login(response._id,response)
        this.router.navigateByUrl('/pokemon/all')
      },
      error:(error)=>{
        this.errorMessage = error.error.message;
      }
    })

  }
}
