import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  info: any;
  constructor(private UserService: UsersService){

  }
  ngOnInit(): void {
    this.UserService.getUsers().subscribe(data=>
      {this.info = data});
  }


}
