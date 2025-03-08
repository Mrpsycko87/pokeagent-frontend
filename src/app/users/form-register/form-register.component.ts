import { Component } from '@angular/core';
import { SharedModule } from '../../material.module';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-register',
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {

  errorMessage: string = '';

  constructor(
    private router:Router,
    private userService:UsersService
  ){}

  public registerForm = new FormGroup({
    name:new FormControl(),
    password: new FormControl(),
  });

  regForm(){
    this.userService.signup(this.registerForm.getRawValue()).subscribe({
      next:(response)=>{
        console.log('Registro  exitoso:', response);
        Swal.fire({
          title: "Success",
          text: `Bienvenido a Poke-Agent App ${response.name}, ahora puede iniciar sesión`,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Entendido",
          allowEscapeKey:false,
          allowOutsideClick:false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/users')
          }
        });
      },
      error:(error)=>{
        this.errorMessage = error.error.message;
      }
    })
  }
}
