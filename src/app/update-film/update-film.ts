import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilmService } from '../service/film';
import { ActivatedRoute, Router } from '@angular/router';
import { Films } from '../model/film.model';
import { Genre } from '../model/genre.model';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-update-film',
  styles: ``,
  templateUrl: './update-film.html',
})
export class UpdateFilm implements OnInit {
  currentFilm = new Films();
  genre!: Genre[];
  updateGenreId!: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private cdr: ChangeDetectorRef,
  ) {}

  updateFilm() {
    this.currentFilm.genre = this.genre.find((form) => form.idgenre == this.updateGenreId)!;
    this.filmService.updateFilm(this.currentFilm).subscribe((med) => {
      this.router.navigate(['film']);
    });
  }

  ngOnInit(): void {
    this.filmService.listeGenre().subscribe((form) => {
      this.genre = form._embedded.genres;
      console.log(form);
      this.cdr.markForCheck();
    });
    this.filmService
      .consulterFilm(this.activeRoute.snapshot.params['id'])
      .subscribe((meds) => {
        this.currentFilm = meds;
        this.updateGenreId = this.currentFilm.genre.idgenre;
        this.cdr.markForCheck();
      });
  }
}
