import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {debounceTime, first} from 'rxjs';
import {CepServiceService, EnderecoResult} from "../../../tokens/services/cep-service.service";
import {EnderecoInput} from "../../../tokens/models/endereco-input";
import {CEP_MASK} from "../../../tokens/masks/cep.mask";
import {SubscriptionsManager} from "../../../tokens/utils/subscriptions-manager";

class EnderecoForm {
  public cep: FormControl<string | null>;
  public estado: FormControl<string | null>;
  public logradouro: FormControl<string | null>;
  public numero: FormControl<number | null>;
  public bairro: FormControl<string | null>;
  public cidade: FormControl<string | null>;
  public codigoIbgeCidade: FormControl<string | null>;
  public complemento: FormControl<string | null>;
  public observacao: FormControl<string | null>;
}

@Component({
  selector: 'app-endereco-form' ,
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.scss'
})
export class EnderecoFormComponent implements OnInit, OnDestroy {
  @Output() setEndereco = new EventEmitter<EnderecoInput>();

  public cepMask = CEP_MASK;
  public form: FormGroup<EnderecoForm>;
  public carregado = false;
  public fieldIsRequired = new Map<string, boolean>();

  private subs = new SubscriptionsManager();

  constructor(
    private cepService: CepServiceService,
    private formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.setForm();
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  public get podeSalvar(): boolean {
    return this.form.valid;
  }

  public get tamanhoCep(): number {
    const cepValue = this.form.get('cep')?.value as string;
    if (cepValue) {
      return cepValue.length;
    }
    return 0;
  }

  public salvar(): void {
    if (!this.podeSalvar) return;

    const endereco = this.form.value as EnderecoInput;
    this.setEndereco.next(endereco);
  }

  private setForm(): void {
    this.form = this.formBuilder.group<EnderecoForm>({
      cep: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)] }),
      bairro: new FormControl('', { validators: [Validators.required] }),
      cidade: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      complemento: new FormControl('', { validators: this.oneRequiredValidator('numero', 'complemento') }),
      numero: new FormControl(null, { validators: [
        Validators.min(1), this.oneRequiredValidator('complemento', 'numero')
        ] }),
      observacao: new FormControl(''),
      estado: new FormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2)] }),
      logradouro: new FormControl('', { validators: [Validators.required] }),
      codigoIbgeCidade: new FormControl('', { validators: [Validators.required] })
    });
    this.carregado = true;

    this.setUpdateSecondOnUpdate('numero', 'complemento');
    this.setUpdateSecondOnUpdate('complemento', 'numero');

    this.setSubs();
  }


  private setSubs(): void {
    const cepChangeSub = this.form.get('cep')?.valueChanges
      .pipe(debounceTime(300)).subscribe(
      (value) =>  {
        if (this.form.get('cep')?.valid && value !=  null) {
          this.consultaCep(value)
        }
      }
    );
    this.subs.add(cepChangeSub);
  }

  private consultaCep(valor: string) {
      this.cepService.buscarEndereco(valor)
        .pipe(first())
        .subscribe((dados) => this.populaForm(dados));
  }


  private populaForm(dados: EnderecoResult): void {
    this.form.patchValue({
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
      codigoIbgeCidade: dados.ibge,
    })
  }

  public oneRequiredValidator(secondControlName: string, controlName: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.form) {
        const secondControlValue = this.form?.get(secondControlName)?.value;
        const secondControlHasValue = Boolean(secondControlValue);

        if (secondControlHasValue) {
          this.fieldIsRequired.set(controlName, false);
          return null;
        } else {
          this.fieldIsRequired.set(controlName, true);
          return Validators.required(control);
        }
      }
      return null;
    }
  }

  private setUpdateSecondOnUpdate(first: string, second: string): void {
    const sub = this.form.get(first)
      ?.valueChanges.subscribe(() => {
        this.form.get(second)?.updateValueAndValidity({ emitEvent: false });
      });
    this.subs.add(sub);
  }

  protected readonly Boolean = Boolean;
}
