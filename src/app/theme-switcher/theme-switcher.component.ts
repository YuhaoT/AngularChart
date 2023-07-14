import { Component } from '@angular/core';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    const currentTheme = this.themeService.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.themeService.switchTheme(newTheme);
    this.themeService.current = newTheme;
  }
}
