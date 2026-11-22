import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Films } from '../model/film.model'
import { FilmService } from '../service/film';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../service/auth';

@Component({
  imports: [CommonModule, RouterLink, FormsModule],
  selector: 'app-recherche-par-genre',
  styles: ``,
  templateUrl: './recherche-par-genre.html',
})
export class RechercheParGenre implements OnInit {
  films!: Films[];
  genre!: Genre[];
  IdGenre!: number;

  constructor(
    private filmService: FilmService,
    public authService: Auth,
    private cdr: ChangeDetectorRef,
  ) {}

  supprimerFilm(med: Films) {
    //console.log(med);
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.filmService.supprimerFilm(med.idfilm).subscribe(() => this.onChange());
    }
  }

  onChange() {
    this.filmService.rechercherParGenre(this.IdGenre).subscribe((meds) => {
      this.films = meds;
    this.cdr.markForCheck();
    });

  }

  ngOnInit(): void {
    // this.films = this.filmService.listeFilms();
    // this.genre = this.filmService.listeGenre();
    this.filmService.listeGenre().subscribe((forms) => {
      this.genre = forms._embedded.genres;
      if (this.genre.length > 0) {
        this.IdGenre = this.genre[0].idgenre;
        this.onChange();
      }
      console.log(forms);
      this.cdr.markForCheck();
    });
  }
}
