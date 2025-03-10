import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';
import { SharedModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
  ) { }


  ngOnInit() {}

  resetForm(ev: any) {
    ev.value == 'findByName' ? this.pokeForm.get('id')?.reset() : this.pokeForm.get('name')?.reset()
  }

  findPokemon() {
    this.errorMessage = ''
    this.cardPokemon = false
    this.pokeService.findPokemon(this.pokeForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('pokemon encontrado:', response);
        this.viewPokemonCard(response)
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })
  }


  viewPokemonCard(data: any) {
    const dialogRef = this.dialog.open(CardPokemonComponent, {
      width: '500px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {})
  }
}
