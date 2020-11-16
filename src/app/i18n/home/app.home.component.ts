import {Component, OnInit} from '@angular/core';
import {I18nSwitcherService} from '../../../i18n/service/switcher/i18n.switcher.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.home.component.html',
  styleUrls: ['./app.home.component.scss']
})
export class AppHomeComponent implements OnInit{

  // eslint-disable-next-line no-unused-vars
  constructor(public i18nSwitcherService: I18nSwitcherService, private titleService: Title) {
    this.setTitle();
  }

  public setTitle() {
    this.titleService.setTitle($localize`app.index.title`);
  }

  ngOnInit(): void {
    this.i18nSwitcherService.init();
  }
}
