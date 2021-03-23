import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public loggedIn: boolean;
  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.loggedIn = await this.authService.checkAuthenticated();
  }
}
