import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePokemonComponent } from './update-pokemon/update-pokemon.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-pokemon',
  imports: [SharedModule, CommonModule],
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.css'
})
export class MyPokemonComponent implements OnInit {

  currentIndex = 0;

  constructor(
    private pokeService: PokemonService,
    private token: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getpokemonByuser()
  }

  pokemons = []
  getpokemonByuser() {
    const idUser = this.token.getTokenstorage()
    this.pokeService.getPokemonByuser(idUser).subscribe({
      next: (response) => {
        this.pokemons = response
      },
      error: (error) => {
        console.log(error.error.message);
      }
    })
  }
  next() {
    if (this.currentIndex < this.pokemons.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  updatePokemonNickName(data: any) {
    const dialogRef = this.dialog.open(UpdatePokemonComponent, {
      width: '500px',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        data.nickname = result.nickname
        this.pokeService.updatePokemonByuser(data).subscribe({
          next: (response) => {
            Swal.fire({
              title: "¡Nickname actualizado!",
              text: `Ahora es ${response.nickname}`,
              icon: "success",
            });
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }

  deletePokemon(data: any) {
    Swal.fire({
      title: `Está a punto de liberar de su equipo a ${data.nickname}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Liberar",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.pokeService.deletePokemonByuser(data).subscribe(dta=>{
          this.getpokemonByuser()
          Swal.fire("Liberado!", "", "success");
        })
      }
    });

  }
}
