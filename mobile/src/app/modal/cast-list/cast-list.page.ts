import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ICast } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.page.html',
  styleUrls: ['./cast-list.page.scss'],
})
export class CastListPage {
  @Input() casts: ICast;
  @Input() title: string;
  profilePicUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.w185}/`;
  constructor(private modalCtrl: ModalController, private router: Router) { }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
