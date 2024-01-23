import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {

  userList! : User[]
  constructor(private service : AuthService){}

  ngOnInit() {
    this.service.getAllUser().subscribe({
      next : (data : User[]) => this.userList = data
    })
  }
}
