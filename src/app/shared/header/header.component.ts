import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '@core/services/user-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userLoginService: UserLoginService,
    private router: Router) { }

  @ViewChild('loginButton') private loginButton: ElementRef;

  ngOnInit(): void {
    this.userLoginService.decodeJwt();
    console.log(this.userLoginService.jwtTokenValue);
  }

  menuClick() {
    if (this.userLoginService.isLoggedIn())
      this.router.navigate(['/foodmenu']);
    else {
      if (this.loginButton)
        this.loginButton.nativeElement.click();
    }
  }

}
