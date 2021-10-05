import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _visible: BehaviorSubject<boolean>;


  constructor() { 
    this._init();
  }

  private _init(): void {
    this._visible = new BehaviorSubject(false);
  }

  show(): void {
    this._visible.next(true);
  }

  hide(): void {
    this._visible.next(false);
  }

  get visible(): Observable<any> {
    return this._visible.asObservable();
  }
}
