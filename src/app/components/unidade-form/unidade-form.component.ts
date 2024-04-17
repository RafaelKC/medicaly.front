import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EnderecoInput } from '../../../tokens';
import { TipoUnidade } from '../../../tokens/enums/tipo-unidade';
import { UnidadeFormService } from './unidade-form.service';
import { UnidadeAtendimentoInput } from '../../../tokens/models/unidade-atendimento-input';
import { CreateUnidadeInput } from '../../../tokens/models/create-unidade-input';
import {v4 as uuidv4} from "uuid";
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface UnidadeForm {
  nome: FormControl<string | null>;
  tipo: FormControl<TipoUnidade | null>;
}
@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrl: './unidade-form.component.scss',
})
export class UnidadeFormComponent {

  constructor(
    private _fb: FormBuilder,
    private unidadeService: UnidadeFormService,
    private messageService: MessageService,
    private router: Router
  ) {}
  @Output() setEndereco = new EventEmitter<EnderecoInput>();
  public unidadeForm: FormGroup<UnidadeForm>;
  public etapaUsuario: boolean = true;
  public tipoUnidade = TipoUnidade;
  public carregado = false;

  public ngOnInit(): void {
    this.setForm();
  }

  public getForm(event: Event) {
    event.preventDefault();
    console.log(this.unidadeForm.getRawValue());

    this.etapaUsuario = false;
  }

  private setForm(): void {

    this.unidadeForm = this._fb.group<UnidadeForm>({
      nome: new FormControl('', [Validators.required]),
      tipo: new FormControl(TipoUnidade.Clinica, [Validators.required]),
    });
    this.carregado = true;
  }

  public serEndereco(endereco: EnderecoInput): void {
    const unidade = this.unidadeForm.value
    const unidadeInput = new CreateUnidadeInput();
    unidadeInput.unidadeAtendimento = unidade as UnidadeAtendimentoInput
    unidadeInput.endereco = endereco;
    console.log(unidadeInput)
    this.unidadeService.create(unidadeInput).subscribe({
      next: () => {
        this.messageService.add({ summary: 'Unidade de atendimento criada crom sucesso', severity: 'success' });
        this.router.navigate(['/auth/dashboard-adm'])
      }
    })
  }
}

