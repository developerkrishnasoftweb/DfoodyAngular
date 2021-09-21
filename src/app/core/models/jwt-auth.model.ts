export interface IJwtAuthModel {
   ClientId: string;
   Jwt: string;
   JwtInfo: IJwtInfo;
}

export interface IJwtInfo {
   grant_type: string;
   token_type: string;
   cid: string;
   sub: string;
   sessionid: string;
   jti: string;
   lastname: string;
   fullName: string;
   scopes: string[];
   iss: string;
   aud: string;
   exp: number;
   iat: number;
   nbf: number;
   countryId?: string;
}

export interface IRole {
   RoleName: string;
   Elements: IElement[];
   Widgets: IWidget[];
}

export interface IElement {
   ElementName: string;
   State: IState[];
}

export interface IWidget {
   WidgetName: string;
   State: IState[];
}

export interface IState {
   PartyType: string;
   ClientTypeList: any[];
   ClientSubTypeList: any[];
   State: string;
}
