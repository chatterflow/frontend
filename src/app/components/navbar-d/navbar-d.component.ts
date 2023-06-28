import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-d',
  templateUrl: './navbar-d.component.html',
  styleUrls: ['./navbar-d.component.scss']
})
export class NavbarDComponent {
  constructor(private router: Router) { }

  submit(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
