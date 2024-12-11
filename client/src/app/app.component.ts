import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './core/auth.service';
import {User} from '@angular/fire/auth';
import {MatAnchor, MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatAnchor, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
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
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
