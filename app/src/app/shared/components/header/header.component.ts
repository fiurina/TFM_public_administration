import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstants } from '../../config/constants/router.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {}

  async logout() {
    await this.authService.logoutUser().toPromise();
    await this.authService.removeStorage();
    this.router.navigateByUrl(RouterConstants.LOGIN, { replaceUrl: true });
  }

}
