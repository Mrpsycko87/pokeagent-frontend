import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users', // 👈 Redirige automáticamente a /login
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.routes')
            .then(m => m.USERS_ROUTES) // Cargar rutas de users
    },
    {
        path: 'pokemon',
        loadChildren: () => import('./pokemon/pokemon.routes')
            .then(m => m.POKEMON_ROUTES), // Cargar rutas de users
        canActivate: [AuthGuard] // Protección con el guardia de autenticación
    },
];

export default routes;
