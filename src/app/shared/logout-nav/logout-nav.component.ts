import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../okta/okta-auth.service';
import { OktaConfigService } from '../okta/okta-config.service';

@Component({
  selector: 'app-logout-nav',
  templateUrl: './logout-nav.component.html',
  styleUrls: ['./logout-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogoutNavComponent implements OnInit {
 

  constructor(
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
  ) { }

  ngOnInit(): void {
  }


  async Logout() {
    this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }
}
