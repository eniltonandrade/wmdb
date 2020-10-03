import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AnimationController, Animation, IonDatetime, ModalController, ToastController, AnimationDirection } from '@ionic/angular';
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
  private animation: Animation;

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

  private toolbarEl: any;
  private titleEl: any;

  @ViewChild('startTimePicker', { static: true }) startTimePicker: IonDatetime;
  @ViewChild('toolbar') toolbar: any;
  @ViewChild('title') title: any;

  constructor(
    private movieDServices: MovieDetailsService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private animateCtrl: AnimationController
  ) { }

  ionViewDidEnter() {
    this.toolbarEl = this.toolbar.el;
    this.titleEl = this.title.el;
    const movieId = +this.route.snapshot.paramMap.get('id');
    this.loadData(movieId);
    this.createAnimation();
  }

  createAnimation() {
    this.animation = this.animateCtrl.create()
      .addElement(this.toolbarEl)
      .duration(300)
      .direction('reverse')
      .fromTo('background', 'transparent', '#131722')
      .addElement(this.titleEl)
      .duration(300)
      .direction('reverse')
      .fromTo('opacity', '0', '100%');
  }

  onScroll(event: any) {
    const scrollTop: number = event.detail.scrollTop;
    const direction: AnimationDirection = scrollTop > 190 ? 'normal' : 'reverse';
    if (this.animation.getDirection() !== direction) { this.animation.direction(direction).play(); }

  }

  loadData(movieId: number) {
    const movieDetails = this.movieDServices.getMovieDetails(movieId);
    const movieAssociation = this.movieDServices.getAssociation(movieId);
    forkJoin([movieDetails, movieAssociation]).subscribe(result => {
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
          handler: () => { },
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
