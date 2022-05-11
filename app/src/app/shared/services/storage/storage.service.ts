import { AlertService } from './../alert/alert.service';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  platform: string;
  constructor(
    private alertService: AlertService
  ) {
    this.getPlatform();
  }

  async getPlatform() {
    this.platform = (await Device.getInfo()).platform;
  }

  async storeData(key: string, value: any): Promise<any> {
    return Storage.set({ key, value: JSON.stringify(value) });
  }

  async getData(key: string): Promise<any> {
    return new Promise(async (resolve) => {
      let data = (await Storage.get({ key })).value;
      if (data) {
        resolve(JSON.parse(data));
      } else resolve(undefined)
    });
  }

  async removeData(key: string): Promise<any> {
    return Storage.remove({ key });
  }

  storeDataSecure(key: string, value: any) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.platform !== 'web') {
          await SecureStoragePlugin.set({ key, value: JSON.stringify(value) });
        } else await this.storeData(key, value);
        resolve(true);
      } catch (error) {
        // this.alertService.showErrorAlert('Esta aplicación utiliza el sistema de almacenamiento seguro de su dispositivo. Para más seguridad, por favor, active el bloqueo de pantalla.');
        reject(undefined);
      }
    });
  }

  getDataSecure(key: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let data;
        this.platform = (await Device.getInfo()).platform;
        if (this.platform !== 'web') { data = (await SecureStoragePlugin.get({ key })).value; }
        else data = JSON.stringify(await this.getData(key));
        if (data) { resolve(JSON.parse(data)); }
        else resolve(undefined)
      }
      catch (error) {
        resolve(undefined);
        // this.alertService.showErrorAlert('Esta aplicación utiliza el sistema de almacenamiento seguro de su dispositivo. Para más seguridad, por favor, active el bloqueo de pantalla.');
      }
    });
  }

  removeDataSecure(key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.platform !== 'web') { await SecureStoragePlugin.remove({ key }); }
        else await this.removeData(key);
        resolve(true);
      } catch (error) {
        // this.alertService.showErrorAlert('Esta aplicación utiliza el sistema de almacenamiento seguro de su dispositivo. Para más seguridad, por favor, active el bloqueo de pantalla.');
        resolve(undefined);
      }
    });
  }

  clearSecure() {
    return new Promise(async (resolve, reject) => {
      try {
        await SecureStoragePlugin.clear();
        resolve(true);
      }
      catch (error) {
        // this.alertService.showErrorAlert('Esta aplicación utiliza el sistema de almacenamiento seguro de su dispositivo. Para más seguridad, por favor, active el bloqueo de pantalla.');
        resolve(undefined);
      }
    });
  }



}
