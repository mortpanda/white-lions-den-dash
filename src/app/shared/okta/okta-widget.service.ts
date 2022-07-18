import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfigService } from "./okta-config.service";

@Injectable({
  providedIn: 'root'
})

export class OktaWidgetService {
  private authClient = new OktaAuth({
    issuer: this.OktaConfig.strIssuer,
    clientId: this.OktaConfig.strClientID,
  });
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfig.strPostLogoutURL;

  constructor(
    private router: Router,
    private OktaConfig: OktaConfigService
  ) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(redirecturi) {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = redirecturi;
    const OktaBrand = this.OktaConfig.strBrand;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      // flow:"login",
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      features: {
        showPasswordToggleOnSignInPage: false,
        hideSignOutLinkInMFA: false,
        rememberMe: false,
        registration: false,
        multiOptionalFactorEnroll: false,            // Allow users to enroll in multiple optional factors before finishing the authentication flow.
        selfServiceUnlock: false,                    // Will enable unlock in addition to forgotten password
        smsRecovery: false,                          // Enable SMS-based account recovery
        callRecovery: false,
      },
      colors: {
        brand: OktaBrand,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      useInteractionCodeFlow: true,
    });
    console.log(OktaScope);
    // *****************************************************************************
    // This will display the context in the console.
    // *****************************************************************************
    await oktaSignIn.on('afterRender', function (context, error) {
      console.log(context.controller);
    });
    // *****************************************************************************
    // *****************************************************************************
    // oktaSignIn.on('afterRender', function (context) {
    //   // document.getElementById('okta-login-container').remove();
    //   let element: HTMLElement = document.getElementsByClassName('js-go-back')[0] as HTMLElement;
    //   element.remove();
    //   var button = document.createElement('input');
    //   button.setAttribute('type', 'submit');
    //   button.setAttribute('ID', 'btnLink');
    //   button.setAttribute('value', 'Click me!');
    //   button.setAttribute('onclick', 'GoToURL()');
    //   button.setAttribute('form', 'myform');
    //   document.body.appendChild(button);
    //   button.setAttribute("class", "btn btn-primary");
    // })
    await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {
      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      oktaSignIn.remove();
      const idToken = tokens.idToken;
      const strTokens = JSON.stringify(tokens)
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
      window.location.replace(OktaRedirect);
      return true;
    }).catch(function (err) {
      console.error(err);
      return false;
    });
  }

  CloseWidget() {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = this.OktaConfig.strRedirectURL;
    const OktaBrand = this.OktaConfig.strBrand;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      useInteractionCodeFlow: true,
    });
    oktaSignIn.remove();
  }

}