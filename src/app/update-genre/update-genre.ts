import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-update-genre',
  styles: ``,
  templateUrl: './update-genre.html',
})
export class UpdateGenre implements OnInit {

  @Input()
  genre! : Genre;

  @Output()
  genreUpdated = new EventEmitter<Genre>();

  @Input()
  ajout!:boolean;


  ngOnInit(){
    console.log("ngOnInit du composant UpdateGenre ",this.genre);
  }

  saveGenre(){
    this.genreUpdated.emit(this.genre);
  }


}
