import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', link: './list' },
    { label: 'Añadir', icon: 'add', link: './new-hero' },
    { label: 'Buscar', icon: 'search', link: './search' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.onLogout();
    this.router.navigate(['/auth/login']);
  }
}
