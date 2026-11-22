import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilmService } from '../service/film';
import { Genre } from '../model/genre.model';
import { UpdateGenre } from '../update-genre/update-genre';
import { CommonModule } from '@angular/common';

@Component({
  imports: [UpdateGenre, CommonModule],
  selector: 'app-liste-genres',
  styles: ``,
  templateUrl: './liste-genres.html',
})
export class ListeGenres implements OnInit {
  genres!: Genre[];
  updatedGenre: Genre = { idgenre: 0, titregenre: '' };
  ajout: boolean = true;

  constructor(
    private filmService: FilmService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres() {
    this.filmService.listeGenre().subscribe((res) => {
      this.genres = res._embedded?.genres ?? [];
      this.cdr.markForCheck();
    });
  }

  genreUpdated(genre: Genre): void {
    const requete = this.ajout
      ? this.filmService.ajouterGenre(genre)
      : this.filmService.updateGenre(genre);
    requete.subscribe(() => {
      this.updatedGenre = { idgenre: 0, titregenre: '' };
      this.ajout = true;
      this.chargerGenres();
    });
  }

  updateGenre(genre: Genre) {
    this.updatedGenre = { ...genre };
    this.ajout = false;
  }
}
