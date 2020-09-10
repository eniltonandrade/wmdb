import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public recentlyWatchedMovies: any[];

  public movieTotals: any;

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

  constructor(private homeService: HomeService) {
    this.loadGaugeData();
    this.loadRecentlyWatched();
    this.loadWatchedByDayOfWeek();
    this.loadTotalMovies();
  }

  ngOnInit() {
  }

  loadWatchedByDayOfWeek(): void {
    this.homeService.getMovieCountByDayOfWeek().subscribe(res => {
      const data: any = (res as any).result;
      const labels = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

      this.dayOfWeekData[0].data = [];
      this.dayOfWeekLabel = labels;

      for (const value of data) {
        this.dayOfWeekData[0].data.push(value.total);
      }

    });
  }
  loadTotalMovies(): void {
    this.homeService.getTotalMovies().subscribe(res => {
      this.movieTotals = res;
    });
  }
  loadRecentlyWatched(): void {
    this.homeService.getMoviesList(10).subscribe((res) => {
      this.recentlyWatchedMovies = res;
    });
  }

  loadGaugeData(): void {
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

  generateImageUrl(url: string): string {
    return `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/${url}`;
  }

}
