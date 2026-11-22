import { Component, OnInit } from '@angular/core';
import { FilmService } from '../service/film';
import { Films } from '../model/film.model';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter-pipe';
import { Auth } from '../service/auth';

@Component({
  imports: [FormsModule, CommonModule,RouterLink,SearchFilterPipe],
  selector: 'app-recherche-par-nom',
  styles: ``,
  templateUrl: './recherche-par-nom.html',
})
export class RechercheParNom implements OnInit {

  films!: Films[];
  allmeds!: Films[];
  //nomfilm! : string;
  searchTerm! : string;
  
  constructor(private filmService: FilmService, public authService : Auth){
      
    }
  
    supprimerFilm(meds: Films) {
    //console.log(med);
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
      this.filmService.supprimerFilm(meds.idfilm).subscribe(() => this.ngOnInit());
    }
  }



  ngOnInit(): void {
    this.filmService.listeFilms().subscribe(meds => {
      this.films = meds;
    });
    //console.log(meds);
    //this.allmeds = meds;
  }


  //onKeyUp(filterText : string){
  //  this.films = this.allmeds.filter(item =>
  //    item.nomfilm.toLowerCase().includes(filterText));
  //}
  
}
