import { Component, HostListener } from '@angular/core';
import * as moment from 'moment';
import { debounce, AppService } from './shared/services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-calendar';

  @HostListener('window:resize', ['$event'])
  @debounce(250)
  onResize(event) {
    this.appService.setScreenWidth(window.innerWidth);
    this.appService.setScreenHeight(window.innerHeight);
  }

  constructor(private appService: AppService) {
    moment.locale('de');
  }
}
