import { Component, OnInit } from '@angular/core';
import { I18nSwitcherService } from '../../../i18n/switcher/i18n.switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.home.component.html',
  styleUrls: ['./app.home.component.scss']
})
export class AppHomeComponent implements OnInit{

  // eslint-disable-next-line no-unused-vars
  constructor(public i18nSwitcherService: I18nSwitcherService) {
  }

  ngOnInit(): void {
    this.i18nSwitcherService.init();
  }
}
