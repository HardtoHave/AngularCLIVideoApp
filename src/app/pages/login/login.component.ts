import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(){
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/upload']).then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.log('Navigation failed');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      this.errorMessage = 'Invalid username or password';
      console.log('Login unsuccessful');
    }
  }
}
