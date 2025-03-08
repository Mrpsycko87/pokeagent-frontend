import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  imports: [SharedModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  nameUser: string = ''
  isLoggedIn: boolean = false;
  constructor(
    private userService: UsersService,
    private router: Router,
    private token: AuthService
  ) { }

  ngOnInit() {
    this.token.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status; // ✅ Recibe el estado de autenticación
      this.isLoggedIn ? this.getUserName() : null
    })
  }


  logout() {
    this.token.logout()
    this.isLoggedIn = false
    this.nameUser = ''
    this.router.navigateByUrl('/users')
  }

  getUserName() {
    const user = this.token.getUserStorage()
    const { name } = user
    this.nameUser = name
  }

}
