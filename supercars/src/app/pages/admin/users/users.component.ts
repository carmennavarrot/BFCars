import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

users! : User[] 
 filtro: string = ""

constructor(private userService : UserService){
  userService.getAll().subscribe({
    next:(response)=>{
      this.users = response as User[]
    },
    error:()=>{}
  })
}


}
