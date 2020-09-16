import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {}

  getMoviesList(limit: number) {
    return this.http.get<any[]>(`${this.API_URL}users/movies?limit=${limit}`).pipe(
      shareReplay()
    );
  }
}
