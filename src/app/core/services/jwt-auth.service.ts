import { Injectable } from '@angular/core';
import { IJwtAuthModel, IRole, IJwtInfo } from 'src/app/core/models/jwt-auth.model';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  private readonly JWT_KEY = 'Authorization';
  private readonly auth = {} as IJwtAuthModel;
  private readonly JWT_PARTYID = 'PartyId';

  constructor() { }

  /**
   * Gets the currently logged in user's JWT Token
   */
  getCurrentUserJWTToken(): string {
    this.auth.Jwt = localStorage.getItem(this.JWT_KEY);
    if (!this.auth.Jwt) {
      // TODO: Need to find out what to do when no jwt exists temprop sending as blank
      return '';
    } else {
      return this.auth.Jwt;
    }
  }

  /**
 * Gets the currently logged in user's decoded JWT Token
 */
  getDecodedCurUserJWTToken(): IJwtInfo {
    this.auth.Jwt = localStorage.getItem(this.JWT_KEY);
    if (!this.auth.Jwt) {
      // TODO: Need to find out what to do when no jwt exists temprop sending as blank
      return null;
    } else {
      let jwt = {} as IJwtInfo;
      jwt = this.decodeJwt(this.auth.Jwt);
      return jwt;
    }
  }



  /**
   * Gets the currently logged in user's JWT Token
   */
  getCurrentUserPartyId(): string {
    const partyId = localStorage.getItem(this.JWT_PARTYID);
    if (!partyId) {
      // TODO: Need to find out what to do when no jwt exists temprop sending as blank
      return '';
    } else {
      return partyId;
    }
  }

  /**
   * Gets the token groups
   * @param JWTToken The jwt security token
   */
  getJWTTokenGroups(JWTToken: IJwtInfo): string[] {
    let groups = [];
    if (JWTToken !== null && JWTToken !== undefined) {
      groups = JWTToken.scopes;
    }
    return groups;
  }

    /**
   * Returns a decoded jwt
   * @param jwt jwt string to be decoded
   */
  decodeJwt(jwt: string): IJwtInfo {
    let JWTData: string;
    let JWTJsonData: string;
    let decodedJwt: IJwtInfo;

    if (jwt !== null && jwt !== undefined) {
      // Split the jwt in 3 parts and use part 1
      JWTData = jwt.split('.')[1];

      // Decode base64 string to a normal string
      JWTJsonData = window.atob(JWTData);

      // Convert string JWT data to Json
      decodedJwt = JSON.parse(JWTJsonData);
    }

    return decodedJwt;
  }
}

