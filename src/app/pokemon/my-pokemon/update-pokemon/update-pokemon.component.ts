import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../material.module'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-pokemon',
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-pokemon.component.html',
  styleUrl: './update-pokemon.component.css'
})
export class UpdatePokemonComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataJoin: any
  ){

  }

  public updateForm = new FormGroup({
      nickname: new FormControl(),
  });

}
