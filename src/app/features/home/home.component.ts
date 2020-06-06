import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signOut() {
    console.log('sign out');
    this.authService.signOut();
  }
}
