import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginREsponse } from '../../interfaces/login-response';
import { User } from '../../interfaces/user';
import { Token } from '@angular/compiler';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
form!: FormGroup

constructor(private builder: FormBuilder,
  private authService: AuthService,
  private router: Router){
  this.form = builder.group({
    "email": new FormControl (null,[Validators.required, Validators.email]),
      "password": new FormControl(null,[Validators.required])
    
  })
}
login(){
  const email: string = this.form.value.email 
  const pass: string = this.form.value.password
  
  this.authService.login(email, pass).subscribe({
    next: (response)=>{
      const loginResponse: LoginREsponse = response as LoginREsponse
      const user: User = { token: loginResponse.token, id: loginResponse.id, role: loginResponse.role }
      this.authService.saveUser(user)
      this.router.navigateByUrl("/")
    },
    error: ()=>{
      
    }
  })
}
}

