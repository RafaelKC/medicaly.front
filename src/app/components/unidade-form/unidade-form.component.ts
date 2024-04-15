import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface UnidadeForm {
  nome: FormControl<string | null>;
  tipo: FormControl<string | null>;
}
@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrl: './unidade-form.component.scss',
})

export class UnidadeFormComponent {

  constructor(private _fb: FormBuilder){}

  public unidadeForm: FormGroup<UnidadeForm>;
  public etapaUsuario: boolean = true

  public ngOnInit(): void{
    this.setForm()
  }

  public getForm(){
    console.log(this.unidadeForm.getRawValue())
    this.etapaUsuario = false
  }

  private setForm(): void {
    this.unidadeForm = this._fb.group({
      nome: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    });
   }
}
