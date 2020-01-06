import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ThemeService} from '../../core/services/theme/theme.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  private firstname = 'John';
  private lastname = 'Doe';
  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService, private router: Router) {
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
