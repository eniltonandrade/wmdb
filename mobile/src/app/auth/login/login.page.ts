import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogin = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogin) {
      this.isLoading = true;
      const loading = await this.loadingCtrl.create({
        keyboardClose: true,
        message: 'Entrando...',
      });
      await loading.present();
      this.authService.login(email, password).subscribe(
        (res) => {
          this.isLoading = false;
          loading.dismiss();
          this.router.navigate(['/tabs/home']);
        },
        (error) => {
          loading.dismiss();
          this.presentToast();
          form.resetForm();
        }
      );
    } else {
      console.log(email, password);
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Email/Senha incorreto. Tente Novamente!',
      duration: 2000,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

}
