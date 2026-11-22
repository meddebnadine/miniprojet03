import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Films } from '../model/film.model';
import { FilmService } from '../service/film';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-film',
  styleUrl: './film.css',
  templateUrl: './film.html',
})
export class Film implements OnInit {
  film!: Films[];

  constructor(
    private filmService: FilmService,
    public authService: Auth,
    private cdr: ChangeDetectorRef,
  ) {
    // this.film = this.filmService.listeFilms();
  }

  //constructor() {
  //  this.film = [
  //    { idfilm: 1, nomfilm: "Inception", notefilm: 5.99, dateSortie: new Date("2023-01-01") },
  //    { idfilm: 2, nomfilm: "Interstellar", notefilm: 4.99, dateSortie: new Date("2023-02-01") },
  //    { idfilm: 3, nomfilm: "Parasite", notefilm: 6.99, dateSortie: new Date("2023-03-01") },
  //    { idfilm: 4, nomfilm: "Joker", notefilm: 3.99, dateSortie: new Date("2023-04-01") }
  //  ];
  //}

  // supprimerFilm(med: Films) {
  //   //console.log(med);
  //   let conf = confirm("Etes-vous sûr ?");
  //   if (conf){
  //     this.filmService.supprimerFilm(med);
  //   }
  // }

  ngOnInit(): void {
    this.chargerFilms();
  }
  chargerFilms() {
    this.filmService.listeFilms().subscribe((meds) => {
      console.log(meds);
      this.film = meds;
      this.cdr.markForCheck();
    });
  }

  supprimerFilm(m: Films) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.filmService.supprimerFilm(m.idfilm).subscribe(() => {
        console.log('film supprimé');
        this.chargerFilms();
      });
  }
}




