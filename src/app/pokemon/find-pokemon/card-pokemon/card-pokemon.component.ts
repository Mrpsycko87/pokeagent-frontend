import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PokemonService } from '../../../services/pokemon/pokemon.service';
import Swal from 'sweetalert2'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-pokemon',
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css'
})
export class CardPokemonComponent {
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataJoin: any,
    private pokeService: PokemonService,
    private token: AuthService,
    private router: Router
  ) { }

  
  closeDialog(data?:any): void {
    this.dialogRef.close(data)
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
                confirmButtonText: 'Entendido'
              });
              this.closeDialog()
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
            confirmButtonText: 'Entendido'
          });
          this.closeDialog()
          this.router.navigateByUrl('/pokemon/all')
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      })
    }
  }

}
