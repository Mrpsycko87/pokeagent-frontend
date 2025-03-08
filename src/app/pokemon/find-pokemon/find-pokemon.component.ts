import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-find-pokemon',
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './find-pokemon.component.html',
  styleUrl: './find-pokemon.component.css'
})
export class FindPokemonComponent implements OnInit {
  cols: number = 2;
  errorMessage: string = '';
  cardPokemon: boolean = false
  options_find = [{ option: 'N° Identificador', value: 'findById' }, { option: 'Nombre', value: 'findByName' }]
  public pokeForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    type_find: new FormControl()
  });

  pokeFound: any
  constructor(
    private pokeService: PokemonService,
    private token: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }
  ngOnInit() {
    this.responsiveactive()
  }
  responsiveactive() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // Teléfonos
      Breakpoints.Small, // Tablets
      Breakpoints.Medium, // Pantallas medianas
      Breakpoints.Large // Pantallas grandes
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1; // 1 columna en pantallas pequeñas
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 1; // 1 columnas en tablets
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = 2; // 2 columnas en pantallas medianas
        } else {
          this.cols = 2; // 2 columnas en pantallas grandes
        }
      }
    })
  }

  resetForm(ev: any) {
    ev.value == 'findByName' ? this.pokeForm.get('id')?.reset() : this.pokeForm.get('name')?.reset()
  }

  findPokemon() {
    this.errorMessage = ''
    this.cardPokemon = false
    this.pokeService.findPokemon(this.pokeForm.getRawValue()).subscribe({
      next: (response) => {
        this.cardPokemon = true
        this.pokeFound = response
        console.log('pokemon encontrado:', this.pokeFound);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })
  }

  async capturePokemon(data: any) {
    const token = this.token.getTokenstorage()
    const { value: nickname } = await Swal.fire({
      title: "¿Agregar Nickname al pokémon?",
      input: "text",
      inputLabel: "Si deja el espacio en blanco se guardará con el mismo nombre",
      showCancelButton: false,
      inputValidator: (value) => {
        if (!value) {
          data.nickname = data.name
          data.user = token
          this.pokeService.capturePokemon(data).subscribe({
            next: (response) => {
              Swal.fire({
                imageUrl: "assets/img/pokeball-shimmer.gif",
                imageWidth: 200,
                imageHeight: 100,
                title: `${response.name} ha sido capturado`,
                icon: "success",
                confirmButtonText:'Entendido'
              });
              this.router.navigateByUrl('/pokemon/all')
            },
            error: (error) => {
              this.errorMessage = error.error.message;
            }
          })
        }
      }
    });
    if (nickname) {
      data.nickname = nickname
      data.user = token
      this.pokeService.capturePokemon(data).subscribe({
        next: (response) => {
          Swal.fire({
            imageUrl: "assets/img/pokeball-shimmer.gif",
            imageWidth: 200,
            imageHeight: 100,
            title: `${response.name} ha sido capturado`,
            icon: "success",
            confirmButtonText:'Entendido'
          });
          this.router.navigateByUrl('/pokemon/all')
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      })
    }

  }

}
