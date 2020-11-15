import { Component, Inject, LOCALE_ID } from '@angular/core';
import { I18nSwitcherService } from '../../i18n/service/switcher/i18n.switcher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  minutes: number;
  gender: string;

  constructor(@Inject(LOCALE_ID) public locale: string, public i18nSwitcherService: I18nSwitcherService) {
    this.minutes = this.getMinutes();
    this.gender = this.getGender();
  }

  getMinutes(): number
  {
    const minutes = parseInt(localStorage.getItem('minutes'), 10);
    if (isNaN(minutes)) {
      return 0;
    }
    return minutes;
  }

  getGender(): string
  {
    const gender = localStorage.getItem('gender');

    if (gender === '' || gender === undefined || gender === null) {
      return 'male';
    }
    return gender;
  }

  setGender(): void
  {
    if (this.gender === 'male') {
      this.gender = 'female';
    } else {
      this.gender = 'male';
    }
    localStorage.setItem('gender', this.gender);
  }

  setMinutes(operation: string = '+'): void
  {
    switch (operation) {
      case '+': {
        this.minutes ++;
        break;
      }
      case '-': {
        if (this.minutes > 0) {
          this.minutes --;
        } else {
          alert('can t set minutes less than 0');
        }
        break;
      }
      default : {
        this.minutes ++;
        break;
      }
    }
    localStorage.setItem('minutes', this.minutes.toString());
  }
}
