import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
  ) { }

  async showErrorAlert(title: string, message?:string) {
    let platform = (await Device.getInfo()).platform;
    if(platform ==='android' || platform ==='ios'){
      await Toast.show({ text: title, duration: 'long', position: 'bottom' });
    }else {
      const alert = await this.alertController.create({
        cssClass: 'custom-error-alert',
        header: title,
        message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
