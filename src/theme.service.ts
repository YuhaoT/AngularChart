import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  private readonly style: HTMLLinkElement;
  public static default = 'light';
  public theme$ = this.themeSubject.asObservable();

  public getTheme(): string {
    return this.themeSubject.value;
  }

  switchTheme(theme: string): void {
    this.themeSubject.next(theme);
  }

  public get current(): string {
    return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
    localStorage.setItem('theme', value);
    this.style.href = `/${value}.css`;
  }
  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    if (localStorage.getItem('theme') !== undefined) {
        this.style.href = `/${this.current}.css`;
    }
  }
}
