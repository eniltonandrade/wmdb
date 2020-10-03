import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonDatetime, ModalController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { CastListPage } from 'src/app/modal/cast-list/cast-list.page';
import { ICrew, IMovie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';
import { MovieDetailsService } from './movie-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage {
  public movie: IMovie;
  public error = false;
  public watchedDate: Date;
  public today = new Date();
  public directors: ICrew[];
  public posterUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}`;
  public profileUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.w45}`;
  public isWatched = false;
  public fabIcon = 'add-sharp';

  public customMonthShortNames: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'aug', 'set', 'out', 'nov', 'dez'];
  @ViewChild('startTimePicker', { static: true }) startTimePicker: IonDatetime;

  constructor(
    private movieDServices: MovieDetailsService,
    private route: ActivatedRoute, 
    private toastCtrl: ToastController,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
    ) { }

  ionViewDidEnter() {
    const movieId = +this.route.snapshot.paramMap.get('id');
    this.loadData(movieId);
  }

  loadData(movieId: number) {
    const movieDetails = this.movieDServices.getMovieDetails(movieId);
    forkJoin([movieDetails]).subscribe(result => {
      this.movie = result[0];
      this.directors = this.movie.casts.crew.filter((x) => x.job === 'Director');
    }, (error) => {
      this.presentToast(error.message);
      this.error = true;
    });
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

  async presentCastListModal() {
    const modal = await this.modalController.create({
      component: CastListPage,
      componentProps: {
        casts: this.movie.casts.cast,
        title: this.movie.title,
      },
    });
    return await modal.present();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Quando Você Assistiu?',
      buttons: [
        {
          text: 'Agora Mesmo',
          icon: 'calendar-outline',
          handler: () => {
            this.watchedDate = new Date();
            this.setWatched();
          },
        },
        {
          text: 'Outra Data',
          icon: 'calendar-outline',
          handler: () => {
            this.startTimePicker.open();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
  dateChanged(date: any) {
    this.watchedDate = new Date(date.detail.value);
    this.setWatched();
  }

  setWatched() {
    this.fabIcon = 'checkmark-sharp';
  }

  generateImageUrl(url: string): string {
    return `${environment.TMDB.images.base_url}${environment.TMDB.images.backdrop_sizes.w780}/${url}`;
  }
}
