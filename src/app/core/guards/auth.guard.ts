import { inject} from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const auth = inject(UsersService);
  const router = inject(Router);
  return auth.isLoggedIn().subscribe({
    next: (res) => {return res},
    error: (err) => {
      router.navigateByUrl('/'); 
      return err.status;}})
};
