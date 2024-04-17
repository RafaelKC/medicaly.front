import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {EnderecoInput, stringIsNullOrEmptyOrWhitespace} from '../../../tokens';
import { TipoUnidade } from '../../../tokens/enums/tipo-unidade';
import { UnidadeFormService } from './unidade-form.service';
import { UnidadeAtendimentoInput } from '../../../tokens/models/unidade-atendimento-input';
import { CreateUnidadeInput } from '../../../tokens/models/create-unidade-input';
import {v4 as uuidv4} from "uuid";
import { MessageService } from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {UnidadeAtendimentoOutput} from "../../../tokens/models/unidade-atendimento-output";
import {first} from "rxjs";

interface UnidadeForm {
  nome: FormControl<string | null>;
  tipoUnidade: FormControl<TipoUnidade | null>;
}
@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrl: './unidade-form.component.scss',
})
export class UnidadeFormComponent implements OnInit {

  public editando = false;
  public unidade: UnidadeAtendimentoOutput;

  constructor(
    private _fb: FormBuilder,
    private unidadeService: UnidadeFormService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Output() setEndereco = new EventEmitter<EnderecoInput>();
  public unidadeForm: FormGroup<UnidadeForm>;
  public etapaUsuario: boolean = true;
  public tipoUnidade = TipoUnidade;
  public carregado = false;

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
          this.setNovoUnidate();
      } else {
        this.setUnidadeEditar(id);
      }
    })
  }

  public getForm(event: Event) {
    event.preventDefault();

    if (!this.editando) {
      this.etapaUsuario = false;
    } else {
      const unidade = {
        ...this.unidadeForm.value,
        enderecoId: this.unidade.enderecoId,
      } as UnidadeAtendimentoInput;

      this.unidadeService.update(this.unidade.id, unidade).pipe(first())
        .subscribe(() => {
          this.messageService.add({ summary: 'Unidade de atendimento atualizada crom sucesso', severity: 'success' });
          this.router.navigate(['/auth/dashboard-adm'])
        })
    }
  }

  private setForm(): void {

    this.unidadeForm = this._fb.group<UnidadeForm>({
      nome: new FormControl(this.unidade.nome, [Validators.required]),
      tipoUnidade: new FormControl(this.unidade.tipoUnidade, [Validators.required]),
    });
    this.carregado = true;
  }

  public serEndereco(endereco: EnderecoInput): void {
    const unidade = this.unidadeForm.value
    const unidadeInput = new CreateUnidadeInput();
    unidadeInput.unidadeAtendimento = unidade as UnidadeAtendimentoInput
    unidadeInput.endereco = endereco;
    this.unidadeService.create(unidadeInput).subscribe({
      next: () => {
        this.messageService.add({ summary: 'Unidade de atendimento criada crom sucesso', severity: 'success' });
        this.router.navigate(['/auth/dashboard-adm'])
      }
    })
  }

  private setNovoUnidate(): void {
    this.unidade = new UnidadeAtendimentoOutput();
    this.unidade.tipoUnidade = TipoUnidade.Hospital;
    this.setForm();
  }

  private setUnidadeEditar(id: string): void  {
    this.unidadeService.get(id).pipe(first())
    .subscribe({
      next: (unidade) => {
        this.unidade = unidade;
        this.editando = true;
        this.setForm();
      },
      error: () => this.setNovoUnidate()
    })
  }
}

