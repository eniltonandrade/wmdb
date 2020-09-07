import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public recentlyWatchedMovies: any[];

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
    spaceBetween: 24,
    slidesPerView: 2.9,
    clickable: true,
    pagination: false
  };

  constructor(private homeService: HomeService){
    this.loadGaugeData();
    this.loadRecentlyWatched();
  }

  ngOnInit() {
  }

  loadRecentlyWatched(): void {
    this.homeService.getMoviesList(10).subscribe((res) => {
      this.recentlyWatchedMovies = res;
    });
  }

  loadGaugeData(): void{
    this.homeService.getTotalTimeWatched().subscribe(res => {
      this.watchedMonths = res.months;
      this.watchedDays = res.days;
      this.watchedHours = res.hours;
      this.watchedMinutes = res.minutes;
  
      this.monthsGaugeLabel = this.watchedMonths > 1 ? 'Meses' : 'Mês';
      this.daysGaugeLabel = this.watchedDays > 1 ? 'Dias' : 'Dia';
      this.hoursGaugeLabel = this.watchedHours > 1 ? 'Horas' : 'Hora';
      this.minutesGaugeLabel = this.watchedMinutes > 1 ? 'Minutos' : 'Minuto';
    })
    

  }

  generateImageUrl(url: string): string{
    return `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/${url}`;
  }

}
