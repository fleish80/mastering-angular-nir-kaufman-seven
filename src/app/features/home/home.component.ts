import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<User>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signOut() {
    this.authService.signOut();
  }
}
