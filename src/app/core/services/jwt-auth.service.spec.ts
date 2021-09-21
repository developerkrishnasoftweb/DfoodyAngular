import { TestBed, inject } from '@angular/core/testing';
import { JwtAuthService } from './jwt-auth.service';
import { environment } from '../../../environments/environment';

describe('JwtAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtAuthService]
    });
  });

  it('should be created', inject([JwtAuthService], (service: JwtAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return jwt from localstorage', inject([JwtAuthService], (service: JwtAuthService) => {
    const mockJwt = 'kagfksdgfsdgsdgfisdgfsdf';
    environment.envName = 'dev';
    const spyLocalStorage = spyOn(localStorage, 'getItem').and.returnValue(mockJwt);
    const jwt = service.getCurrentUserJWTToken();
    expect(spyLocalStorage).toHaveBeenCalled();
    expect(jwt).toEqual(mockJwt);
  }));

  it('should return jwt as blank', inject([JwtAuthService], (service: JwtAuthService) => {
    const mockEmptyJwt = '';
    environment.envName = 'dev';
    const spyLocalStorage = spyOn(localStorage, 'getItem').and.returnValue(mockEmptyJwt);
    const jwt = service.getCurrentUserJWTToken();
    expect(spyLocalStorage).toHaveBeenCalled();
    expect(jwt).toEqual(mockEmptyJwt);
  }));

  it('should return empty array when token is null', inject([JwtAuthService], (service: JwtAuthService) => {
    const mockJwt = null;
    const groups = service.getJWTTokenGroups(mockJwt);
    expect(groups.length).toBe(0);
  }));

  it('should return empty array when token is undefined', inject([JwtAuthService], (service: JwtAuthService) => {
    const mockJwt = undefined;
    const groups = service.getJWTTokenGroups(mockJwt);
    expect(groups.length).toBe(0);
  }));

  it('should return group for valid token', inject([JwtAuthService], (service: JwtAuthService) => {
    // tslint:disable-next-line: max-line-length
    const mockJwt = 'eyJ0eXAiOiJKV1QiLCJraWQiOiJmNzY5ZWZlVlUtTWpQVWc5SnE1clJoZnR4SW9BQVBadDZRSmNFNFZ2d1BZIiwiYWxnIjoiUlMyNTYifQ.eyJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImNpZCI6IjM3OCIsInN1YiI6Im5iMTcwNTg2Iiwic2Vzc2lvbmlkIjoiY2IzMTBkZjAtOWNhMC0xMWU5LTk5MjktMDA1MDU2YmZiMzAyIiwianRpIjoiY2IzMTBkZjAtOWNhMC0xMWU5LTk5MjktMDA1MDU2YmZiMzAyIiwibGFzdG5hbWUiOiJOQjE3MDU4NiIsImZ1bGxOYW1lIjoiTkIxNzA1ODYiLCJzY29wZXMiOlsiU3RhZmYiXSwiaXNzIjoiaWRwLm5lZGJhbmsuY28uemEiLCJhdWQiOiJiN2ZhZWQ0NC02ODA3LTRiODYtYjQ2MC0yOWIwOWM4ZjM4ZjMiLCJleHAiOjE1NjIwNjU4MDIsImlhdCI6MTU2MjA1NTAwMiwibmJmIjoxNTYyMDU1MDA3fQ.kYjbG09EjaQK6exHFmMUjEAgK0XSIVWbFpNRIVdenzzW8dv9u8HwbyjVVwusVaJsbj6FLx4bpveAdN5mubxDR8ky2iojJD0lMFlT9w0JLHk32e-ZyeBp1QXkl23RmM9NV-HLci8_0qUAlgiuQz3dbu7nsiUm2kw2Y81DUSMz1W1LMTFmgCtXK5NRckI0ZqhSf7LEqyr2oljyRuxGMj-hJ1fiEQytlZ5mqZwvgHXr2an5pR0EI9VY075lV2tkFY3XrXkeeznGyCvE9tqnqF0aTSXxc6btTJJMMP4cI5e3XPqulAX1Homx8yXBGi3TsQp_UVv41FoGGGABYG62IhsGTA';
    const decodedJwt = service.decodeJwt(mockJwt);
    const groups = service.getJWTTokenGroups(decodedJwt);
    expect(groups.length).toBe(1);
  }));

  it('should return decoded jwt object', inject([JwtAuthService], (service: JwtAuthService) => {
    // tslint:disable-next-line: max-line-length
    const mockJwt = 'eyJ0eXAiOiJKV1QiLCJraWQiOiJmNzY5ZWZlVlUtTWpQVWc5SnE1clJoZnR4SW9BQVBadDZRSmNFNFZ2d1BZIiwiYWxnIjoiUlMyNTYifQ.eyJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImNpZCI6IjM3OCIsInN1YiI6Im5iMTcwNTg2Iiwic2Vzc2lvbmlkIjoiY2IzMTBkZjAtOWNhMC0xMWU5LTk5MjktMDA1MDU2YmZiMzAyIiwianRpIjoiY2IzMTBkZjAtOWNhMC0xMWU5LTk5MjktMDA1MDU2YmZiMzAyIiwibGFzdG5hbWUiOiJOQjE3MDU4NiIsImZ1bGxOYW1lIjoiTkIxNzA1ODYiLCJzY29wZXMiOlsiU3RhZmYiXSwiaXNzIjoiaWRwLm5lZGJhbmsuY28uemEiLCJhdWQiOiJiN2ZhZWQ0NC02ODA3LTRiODYtYjQ2MC0yOWIwOWM4ZjM4ZjMiLCJleHAiOjE1NjIwNjU4MDIsImlhdCI6MTU2MjA1NTAwMiwibmJmIjoxNTYyMDU1MDA3fQ.kYjbG09EjaQK6exHFmMUjEAgK0XSIVWbFpNRIVdenzzW8dv9u8HwbyjVVwusVaJsbj6FLx4bpveAdN5mubxDR8ky2iojJD0lMFlT9w0JLHk32e-ZyeBp1QXkl23RmM9NV-HLci8_0qUAlgiuQz3dbu7nsiUm2kw2Y81DUSMz1W1LMTFmgCtXK5NRckI0ZqhSf7LEqyr2oljyRuxGMj-hJ1fiEQytlZ5mqZwvgHXr2an5pR0EI9VY075lV2tkFY3XrXkeeznGyCvE9tqnqF0aTSXxc6btTJJMMP4cI5e3XPqulAX1Homx8yXBGi3TsQp_UVv41FoGGGABYG62IhsGTA';
    const decodedJwt = service.decodeJwt(mockJwt);
    expect(decodedJwt).toBeDefined();
    expect(decodedJwt.aud).toBe('b7faed44-6807-4b86-b460-29b09c8f38f3');
    expect(decodedJwt.cid).toBe('378');
    expect(decodedJwt.sub).toBe('nb170586');
    expect(decodedJwt.lastname).toBe('NB170586');
    expect(decodedJwt.fullName).toBe('NB170586');
  }));

});
