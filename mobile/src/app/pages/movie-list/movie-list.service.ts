import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMovie } from 'src/app/models/movie';

interface IResponse{
  total?: number;
  data?: IMovie[];
}
@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {}

  getMoviesList(offset: number, limit: number) {
    return this.http.get<IResponse>(`${this.API_URL}users/movies?limit=${limit}&offset=${offset}`).pipe(
      shareReplay()
    );
  }

  getTmdbMovieInfo(tmdbId: number) {
    return this.http.get<IMovie>(`${this.API_URL}tmdb/movie/${tmdbId}`).pipe(
      shareReplay()
    );
  }

  updateMovieInfo(id: number, data: IMovie){
    return this.http.put<IMovie>(`${this.API_URL}/movies/${id}`, data).pipe(
      shareReplay()
    );
  }
}
