import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { enviroments } from '../../../enviroments/enviroments';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string = enviroments.baseUrl;
  private user?: User;
  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    return structuredClone(this.user) ?? undefined; // Clone the user object
  }

  checkAuthenticated(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user: User) => {
        this.user = user;
      }),
      map((user) => !!user), //! si el usuario existe retorna true
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user: User) => {
        this.user = user;
        localStorage.setItem('token', 'my-token.asdfewf3rd32.d323awefasdf'); // TOKEN DE EJEMPLO
      })
    );
  }

  onLogout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }
}
