import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMovie } from '../models/movie';
interface IResponse{
  total?: number;
  data?: IMovie[];
}

@Injectable({
  providedIn: 'root'
})


export class HomeService {

  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {}

  getMoviesList(limit: number) {
    return this.http.get<IResponse>(`${this.API_URL}users/movies?limit=${limit}`).pipe(
      map((res) => res.data),
      shareReplay()
    );
  }

  getTotalMovies(){
    return this.http.get<any>(`${this.API_URL}users/movies/stats/totalMovies`).pipe(
      shareReplay()
    );
  }

  getTotalTimeWatched(){
    return this.http.get<any>(`${this.API_URL}users/movies/stats/totalTimeWatched`).pipe(
      shareReplay()
    );
  }

  getMovieCountByDayOfWeek(){
    return this.http.get<any>(`${this.API_URL}users/movies/stats/countByDayOfWeek`).pipe(
      shareReplay()
    );
  }
}
