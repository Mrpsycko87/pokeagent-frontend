import { Routes } from '@angular/router'
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component'
import { FindPokemonComponent } from './find-pokemon/find-pokemon.component'

export const POKEMON_ROUTES: Routes = [
    {path:'all',component: MyPokemonComponent},
    {path:'find',component: FindPokemonComponent}
]