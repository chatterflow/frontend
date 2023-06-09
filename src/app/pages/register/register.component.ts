import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerUserForm = this.fb.group({
    nome_completo: [null, Validators.required],
    genero: [null, Validators.required],
    cpf: [null, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
    email: [null, [Validators.required, Validators.email]],
    data_nascimento: [null, [Validators.required]],
    senha: [null, Validators.required],
    preferencia_comunicacao: ['string'],
    cep: ['string'],
    telefone: ['string'],
    endereco: ['string'],
  })

  constructor(private fb: FormBuilder, private UserService: UsersService) {}
  submitForm(){
    this.UserService.saveUser(this.registerUserForm.value)
  }
}
