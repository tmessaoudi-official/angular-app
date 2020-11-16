import {Component, Inject, LOCALE_ID} from '@angular/core';
import {environment} from '../../../environments/environment';
import {I18nLocaleService} from '../../../i18n/service/i18n.locale.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isNavbarCollapsed: boolean;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Inject(I18nLocaleService) public i18nLocaleService: I18nLocaleService) {
    this.isNavbarCollapsed = true;
  }
}
