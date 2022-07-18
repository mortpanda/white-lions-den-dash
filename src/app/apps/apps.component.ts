import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfigService } from '../shared/okta/okta-config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaGetTokenService } from '../shared/okta/okta-get-token.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppsComponent implements OnInit {
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  userDashUri: SafeResourceUrl;
  myKey;
  myAccessToken;
  myEmail;
  strFullName;
  constructor(
    private OktaConfigService: OktaConfigService,
    public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    private sanitizer: DomSanitizer,
  ) { }



  async ngOnInit() {

    this.strUserSession = await this.authService.isAuthenticated();
    console.log(this.strUserSession)
    switch (this.strUserSession == true) {
      case false:
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        this.strThisUser = await this.authService.token.getUserInfo()
          .then(function (user) {
            return user
          })
          .catch((err) => {
            console.log(err);
            window.location.replace(this.OktaConfigService.strPostLogoutURL);
          })
        this.strFullName = await this.strThisUser.name;
        this.myAccessToken = await this.OktaGetTokenService.GetAccessToken()
        this.myKey = await this.myAccessToken.claims.myKey;
        this.myEmail = await this.myAccessToken.claims.sub;
        console.log(this.myAccessToken)
        this.userDashUri = this.sanitizer.bypassSecurityTrustResourceUrl(this.OktaConfigService.strDashUri);

        break;
    }
  }


}
