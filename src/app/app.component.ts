import { Component, OnInit } from '@angular/core';
import { I18nSwitcherService } from '../i18n/switcher/i18n.switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public i18nSwitcherService: I18nSwitcherService) {
  }

  ngOnInit(): void {
    this.i18nSwitcherService.init();
  }
}
