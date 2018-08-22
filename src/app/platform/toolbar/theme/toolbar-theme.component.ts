import {Component} from '@angular/core';
import {faAdjust} from '@fortawesome/free-solid-svg-icons';
import {getCookie, setCookieNoExpire} from '../../cookies';

@Component({
  selector: 'app-toolbar-theme',
  templateUrl: './toolbar-theme.component.html',
  styleUrls: ['./toolbar-theme.component.css']
})
export class ToolbarThemeComponent {
  theme = 'dark';

  // icons
  icAdjust = faAdjust;

  constructor() {
    let themePref = getCookie('theme-pref');
    if (themePref !== 'dark' && themePref !== 'light') {
      themePref = 'dark';
    }
    this.theme = themePref;
    this.updateThemeSetting();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.updateThemeSetting();
  }

  updateThemeSetting(): void {
    setCookieNoExpire('theme-pref', this.theme);
    const body = document.getElementById('body-el');
    body.classList.remove('evekit-light-theme');
    body.classList.remove('evekit-dark-theme');
    body.classList.add('evekit-' + this.theme + '-theme');
  }
}
