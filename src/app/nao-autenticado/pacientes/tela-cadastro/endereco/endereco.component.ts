import {Component, OnInit} from '@angular/core';
import {CepServiceService, EnderecoResult} from '../../../../cep-service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.scss'
})
export class EnderecoComponent implements OnInit{
  public form: FormGroup;
  public carregado = false;

  constructor(
    private cepService: CepServiceService,
    private formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.setForm();
  }

  public get tamanhoCep(): number {
    const cepValue = this.form.get('cep')?.value as string;
    if (cepValue) {
      return cepValue.length;
    }
    return 0;
  }

  public setForm(): void {
    this.form = this.formBuilder.group({
      cep: null,
      logradouro: null,
      complemento: null,
      bairro: null,
      numero: null,
      cidade: [{value: null, disabled: true}],
      uf: [{value: null, disabled: true}],
      ibge: null,
      observacao: null,
    });
    this.carregado = true;
    this.setSubs();
  }


  private setSubs(): void {
    this.form.get('cep')?.valueChanges .pipe(debounceTime(300)).subscribe(
      (value) => this.consultaCep(value)
    );
  }

  public consultaCep(valor: string) {
      this.cepService.buscar(valor).subscribe((dados) => this.populaForm(dados));
  }


  public populaForm(dados: EnderecoResult): void {
    this.form.patchValue({
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf,
      ibge: dados.ibge,
    })
  }
}
