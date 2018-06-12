import { Injectable } from '@angular/core';
import { userSessionService } from './userSession.service';

@Injectable()
export class authService {

  constructor(
    private session: userSessionService,
  ) {
  }

  public isSignedIn() {
    return !!this.session.accessToken;
  }

  public doSignOut() {
    this.session.destroy();
  }

  public doSignIn(accessToken: string, name: string) {
        console.log('on est dans le service auth')
        console.log(accessToken)
        console.log(name)

    if ((!accessToken) || (!name)) {
      return;
    }
    this.session.accessToken = accessToken;
    this.session.name = name;
    console.log(this.session);
  }

}