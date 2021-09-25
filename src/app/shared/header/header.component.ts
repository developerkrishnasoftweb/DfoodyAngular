import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '@core/services/user-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userLoginService: UserLoginService) { }

  ngOnInit(): void {
    this.userLoginService.decodeJwt();
    console.log(this.userLoginService.jwtTokenValue);
  }

  logout() {
    
  }

}
