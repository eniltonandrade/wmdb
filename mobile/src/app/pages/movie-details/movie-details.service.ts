import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { IMovie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient) { }

  private API_URL = environment.api_url;

  getMovieDetails(tmdbId: number){
    return this.http.get<IMovie>(`${this.API_URL}tmdb/movie/${tmdbId}`).pipe(
      shareReplay()
    );
  }

  getOMDBMovieDetails(imdbId: string){
    return this.http.get<any>(`${this.API_URL}imdb/ratings/${imdbId}`).pipe(
      shareReplay()
    );
  }

  getAssociation(tmdbId: number){
    return this.http.get<any>(`${this.API_URL}users/movies/${tmdbId}`).pipe(
      shareReplay()
    );
  }

  setAssociation(data: any){
    return this.http.post<any>(`${this.API_URL}users/movies/associeate`, data).pipe(
      shareReplay()
    );
  }

  deleteAssociation(tmdbId: number){
    return this.http.delete<any>(`${this.API_URL}users/movies/${tmdbId}`).pipe(
      shareReplay()
    );
  }
}
