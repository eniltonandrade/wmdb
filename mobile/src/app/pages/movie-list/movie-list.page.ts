import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {
  public movies: any[];
  public totalMovies: number;

  constructor(private movieListService: MovieListService) {
    this.loadMovies();
  }

  ngOnInit() {
  }

  loadMovies() {
    this.movieListService.getMoviesList(9).subscribe(res => {
      this.movies = (res as any).data;
      this.totalMovies = (res as any).total;
    });
  }

  generateImageUrl(url: string): string {
    return `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/${url}`;
  }

}
