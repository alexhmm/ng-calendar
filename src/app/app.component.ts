import { Component, HostListener } from '@angular/core';
import * as moment from 'moment';
import { debounce, AppService } from './shared/services/app/app.service';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from './shared/services/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
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
    moment().format('LLLL');
  }

  /**
   * Detects when a view changes. The method assigns an animation state value to the animation trigger (@routeAnimation)
   * based on the route configuration data property value.
   * @param outlet Outlet
   */
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
