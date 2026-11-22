import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import{Films} from '../model/film.model';
import { FilmService } from '../service/film';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';

@Component({
  imports: [FormsModule],
  selector: 'app-add-film',
  styleUrl: './add-film.css',
  templateUrl: './add-film.html',
})
export class AddFilm implements OnInit {
  newFilm = new Films();
  genre!: Genre[];
  newIdGenre!: number;
  newGenre!: Genre;

  constructor(
    private filmService: FilmService,
    private router: Router,
  ) {}

  addFilm() {
    this.newFilm.genre = this.genre.find((form) => form.idgenre == this.newIdGenre)!;
    this.filmService.ajouterFilm(this.newFilm).subscribe((form) => {
      console.log(this.genre);
      this.router.navigate(['film']);
    });
  }

  ngOnInit(): void {
    // this.genre = this.filmService.listeGenre();
    this.filmService.listeGenre().subscribe((forms) => {
      this.genre = forms._embedded.genres;
      console.log(forms);
    });
  }
}
