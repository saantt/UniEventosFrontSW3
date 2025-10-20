import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Unieventos';
  isLogged = false;
  correo: string = "";
  IdCuenta: string = "";

  fontSize = 16;
  highContrast = false;

  constructor(private tokenService: TokenService) {
    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.correo = this.tokenService.getCorreo();
      this.IdCuenta = this.tokenService.getIDCuenta();
    }

    const savedFont = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast');

    if (savedFont) {
      this.fontSize = parseInt(savedFont);
      document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
    }

    if (savedContrast === 'true') {
      this.highContrast = true;
      document.body.classList.add('high-contrast');
    }
  }

  public logout() {
    this.tokenService.logout();
  }

  increaseFont() {
    this.fontSize = Math.min(this.fontSize + 2, 24);
    document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  decreaseFont() {
    this.fontSize = Math.max(this.fontSize - 2, 12);
    document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  toggleContrast() {
    this.highContrast = !this.highContrast;
    document.body.classList.toggle('high-contrast', this.highContrast);
    localStorage.setItem('highContrast', this.highContrast.toString());
  }
}
