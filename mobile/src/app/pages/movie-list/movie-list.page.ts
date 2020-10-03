import { Component, ViewChild } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { environment } from 'src/environments/environment';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { AnimationController, Animation, AnimationDirection, ToastController } from '@ionic/angular';
import { IMovie } from 'src/app/models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage {
  @ViewChild('header') header: any;
  private headerEl: any;
  private lastScrollTop = 0;
  private animation: Animation;

  public movies: IMovie[];
  public totalMovies: number;
  public error = false;

  private offset = 0;
  private limit = 9;

  constructor(
    private movieListService: MovieListService,
    private animateCtrl: AnimationController,
    private toastCtrl: ToastController,
    private router: Router) {

  }

  ionViewDidEnter() {
    this.loadMovies();
    this.headerEl = this.header.el;
    this.createAnimation();
  }

  loadMovies() {
    this.movieListService.getMoviesList(this.offset, this.limit).subscribe(res => {
      this.movies = res.data;
      this.totalMovies = res.total;
      this.offset = this.movies.length;
    }, (error) => {
      this.presentToast(error.message);
      this.error = true;
    });
  }

  loadMoreMovies() {
    this.movieListService.getMoviesList(this.offset, this.limit).subscribe(res => {
      const movies = (res as any).data;
      const movieTemp = this.movies.concat(movies);
      this.movies = [...movieTemp];
      this.offset = this.movies.length;
    }, (error) => {
      this.presentToast(error.message);
      this.error = true;
    });
  }

  loadData(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.loadMoreMovies();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.movies.length === this.totalMovies) {
        event.target.disabled = true;
      }
    }, 500);
  }

  generateImageUrl(url: string): string {
    return `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/${url}`;
  }

  handleImgError(event: any, i: number) {
    const id = this.movies[i].id;
    const tmdbId = this.movies[i].tmdbId;
    this.movieListService.getTmdbMovieInfo(tmdbId).subscribe(res => {
      const newPosterPath = res.poster_path;
      const data = {
        poster_path: newPosterPath
      };
      this.movieListService.updateMovieInfo(id, data).subscribe((response) => { }, (error) => {
        this.presentToast(error.message);
      });
      this.movies[i].poster_path = newPosterPath;
    });
  }

  formatDate(watchedAt: string) {
    if (!watchedAt) { return false; }
    const date = new Date(watchedAt);
    return format(date, 'dd LLL yyy', { locale: ptBR });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  createAnimation() {
    this.animation = this.animateCtrl.create()
      .addElement(this.headerEl)
      .duration(300)
      .direction('reverse')
      .fromTo('transform', 'translateY(0)', `translateY(-${this.headerEl.clientHeight}px)`);
  }

  onScroll(event: any) {
    const scrollTop: number = event.detail.scrollTop;
    const direction: AnimationDirection = scrollTop > this.lastScrollTop ? 'normal' : 'reverse';

    if (this.animation.getDirection() !== direction) { this.animation.direction(direction).play(); }

    this.lastScrollTop = scrollTop;

  }

  onClickPoster(id: number) {
    this.router.navigate(['/tabs/home/movie-details', id]);
  }

}
