import { Component, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { IMovie } from '../models/movie';
import { forkJoin, Observable } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { AnimationController, Animation, ToastController, AnimationDirection } from '@ionic/angular';
import ptBR from 'date-fns/locale/pt-BR';

interface IHomeData {
  movieList: IMovie[];
  movieTotals: {
    total: number;
    totalMonth: number;
    totalYear: number;
  };
  totalByDayOfWeek: {
    result: {
      dayofweek: number;
      total: number;
    };
  };
  totalTimeWatched: {
    months: number;
    days: number;
    hours: number;
    minutes: number;
  };

}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild('header') header: any;
  private headerEl: any;
  private lastScrollTop = 0;
  private animation: Animation;

  public data$: Observable<IHomeData>;
  public error: boolean;
  public recentlyWatchedMovies: IMovie[];
  public totalByDayOfWeek: any;
  public movieTotals: any;
  public totalTimeWatched: any;

  public watchedMonths: number;
  public watchedDays: number;
  public watchedHours: number;
  public watchedMinutes: number;

  public gaugeType = 'full';
  public gaugeColor = '#77d44e';

  public monthsGaugeMax = 12;
  public monthsGaugeLabel: string;

  public daysGaugeMax = 31;
  public daysGaugeLabel: string;

  public hoursGaugeMax = 24;
  public hoursGaugeLabel: string;

  public minutesGaugeMax = 59;
  public minutesGaugeLabel: string;

  public slideOpts = {
    initialSlide: 0,
    spaceBetween: 16,
    slidesPerView: 2.6,
    clickable: true,
    pagination: false
  };

  public dayOfWeekData: ChartDataSets[] = [{
    data: [],
    backgroundColor: '#77d44e',
    steppedLine: 'middle',
    pointRadius: 0,
    borderColor: '#77d44e'

  }];
  public dayOfWeekType: ChartType = 'bar';
  public dayOfWeekLabel: Label[];
  public dayOfWeekChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  constructor(
    private homeService: HomeService,
    private toastCtrl: ToastController,
    private animateCtrl: AnimationController) {
  }

  ionViewDidEnter() {
    this.headerEl = this.header.el;

    this.loadPageData();

    this.createAnimation();
  }

  loadPageData() {
    const movieList$ = this.homeService.getMoviesList(10);
    const totalByDayOfWeek$ = this.homeService.getMovieCountByDayOfWeek();
    const movieTotals$ = this.homeService.getTotalMovies();
    const totalTimeWatched$ = this.homeService.getTotalTimeWatched();

    forkJoin([movieList$, totalByDayOfWeek$, movieTotals$, totalTimeWatched$]).subscribe(result => {
      this.recentlyWatchedMovies = result[0];
      this.totalByDayOfWeek = result[1];
      this.movieTotals = result[2];
      this.totalTimeWatched = result[3];
      this.loadGaugeData();
      this.loadWatchedByDayOfWeek();
    }, (error) => {
      this.presentToast(error.message);
      this.error = true;
    });

  }

  loadWatchedByDayOfWeek(): void {
    const data = this.totalByDayOfWeek.result;
    const labels = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

    this.dayOfWeekData[0].data = [];
    this.dayOfWeekLabel = labels;

    for (const value of data) {
      this.dayOfWeekData[0].data.push(value.total);
    }
  }


  loadGaugeData(): void {
    this.watchedMonths = this.totalTimeWatched.months;
    this.watchedDays = this.totalTimeWatched.days;
    this.watchedHours = this.totalTimeWatched.hours;
    this.watchedMinutes = this.totalTimeWatched.minutes;

    this.monthsGaugeLabel = this.watchedMonths > 1 ? 'Meses' : 'Mês';
    this.daysGaugeLabel = this.watchedDays > 1 ? 'Dias' : 'Dia';
    this.hoursGaugeLabel = this.watchedHours > 1 ? 'Horas' : 'Hora';
    this.minutesGaugeLabel = this.watchedMinutes > 1 ? 'Minutos' : 'Minuto';


  }

  generateImageUrl(url: string): string {
    return `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/${url}`;
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

  formatDate(watchedAt: string){
    const date = new Date(watchedAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR});
  }

}
