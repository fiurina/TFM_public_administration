import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/models/roles.constants';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { RouterConstants } from 'src/app/shared/config/constants/router.constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  Roles = Roles;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) { 
    this.redirectUser();
  }

  ngOnInit() {
  }

  async redirectUser(){
    let role = await this.authService.getUserRole();
    // console.log('User role tabs', role, this.authService.userSession.role);
    switch(role){
      case Roles.ADMIN:
        this.router.navigateByUrl(RouterConstants.POLLS_ADMINISTRATION, {replaceUrl: true});
      break;
      case Roles.CITIZEN:
        this.router.navigateByUrl(RouterConstants.POLLS_CONSUMER, {replaceUrl: true});
      break;
      default:
        this.router.navigateByUrl(RouterConstants.LOGIN, { replaceUrl: true });
        break;
    }
  }

}
