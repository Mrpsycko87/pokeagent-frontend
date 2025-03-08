import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { FormRegisterComponent } from './form-register/form-register.component'

export const USERS_ROUTES: Routes = [
    {path:'',component: LoginComponent},
    {path:'register',component: FormRegisterComponent}
]