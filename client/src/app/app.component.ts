// import {CityListComponent} from './city-list/city-list.component';

import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './core/auth.service';
import {User} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, CityListComponent],
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
