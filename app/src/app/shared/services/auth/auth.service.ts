import { ApiService } from 'src/app/shared/services/api/api.service';
import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { StorageConstants } from '../../config/constants/storage.constants';
import { UserSession } from '../../models/user.model';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RequestEndpoints } from '../../config/constants/api.constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSession: UserSession;
  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
   ) { 
    this.userSession = new UserSession();
  }

  async getPlatformData(){
    return new Promise(async (resolve, reject) => {
      try{
        let platform = (await Device.getInfo()).platform;
        let uuid = (await Device.getId()).uuid;
        let appVersion;
        if(platform!=='web') appVersion = (await App.getInfo()).version;
        resolve({platform, uuid, appVersion});
      }catch(error){ resolve(error); }
    });
  }

  async getUserRole() {
    return new Promise(async (resolve, reject) => {
      try{
        let data: UserSession = await this.storageService.getDataSecure(StorageConstants.USER_DATA);
        resolve(data.role);
      }catch(error){ resolve(undefined);}
    });
  }

  async getUserData() {
    return new Promise(async (resolve, reject) => {
      try{
        let data: UserSession = await this.storageService.getDataSecure(StorageConstants.USER_DATA);
        if(data) this.userSession = data;
        else this.userSession = new UserSession();
        let platform: any = await this.getPlatformData();
        this.userSession.platform = platform.platform;
        this.userSession.uuid = platform.uuid;
        this.userSession.appVersion = platform.appVersion;
        // console.log("GET User data", this.userSession, data);
        resolve(true);
      }catch(error){ resolve(new UserSession());}
    });
  }

  async storeUserData() {
    return await this.storageService.storeDataSecure(StorageConstants.USER_DATA, this.userSession);
  }

  async removeStorage() {
    this.userSession = new UserSession();
    return await this.storageService.clearSecure();
  }

  async removeSession() {
    return new Promise(async (resolve, reject) => {
      try{
        this.userSession.tokenJWT = undefined;
        this.userSession.wallet = undefined;
        await this.storeUserData();
        resolve(true);
      }catch(error){resolve(undefined);}
    });
  }

  logoutUser(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.post(RequestEndpoints.LOGOUT_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

}
