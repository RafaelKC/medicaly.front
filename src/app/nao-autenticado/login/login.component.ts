import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private _fb: FormBuilder){}
  loginForm = this._fb.group({
    email: '',
    password: ''
  })

  onSubmit(){
    console.log("Submit form", this.loginForm.value)
  }
}
