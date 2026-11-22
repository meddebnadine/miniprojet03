import { Injectable } from '@angular/core';
import { Films } from '../model/film.model';
import { Genre } from '../model/genre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL, apiURLGenre } from '../config';
import { genreWrapped } from '../model/genreWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  films!: Films[];
  film!: Films;
  medRecherche!: Films[];

  constructor(private http: HttpClient) {
    console.log('creation de service Film');
  }

  listeFilms(): Observable<Films[]> {
    return this.http.get<Films[]>(apiURL);
  }

  ajouterFilm(meds: Films): Observable<Films> {
    return this.http.post<Films>(apiURL, meds, httpOptions);
  }

  supprimerFilm(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterFilm(id: number): Observable<Films> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Films>(url);
  }

  updateFilm(meds: Films): Observable<Films> {
    return this.http.put<Films>(apiURL, meds, httpOptions);
  }

  rechercherParGenre(idfor: number): Observable<Films[]> {
    const url = `${apiURL}/prodscat/${idfor}`;
    return this.http.get<Films[]>(url);
  }

  listeGenre(): Observable<genreWrapped> {
    return this.http.get<genreWrapped>(apiURLGenre);
  }

  ajouterGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(apiURLGenre, { titregenre: genre.titregenre }, httpOptions);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${apiURLGenre}/${genre.idgenre}`, genre, httpOptions);
  }
}
