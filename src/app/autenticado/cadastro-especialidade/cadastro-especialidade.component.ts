import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {CadastroEspecialidadeService} from "./cadastro-especialidade.service";
import {first} from "rxjs";
import {GenericValidators, Genero, stringIsNullOrEmptyOrWhitespace, TipoProfissional} from "../../../tokens";
import {ProfissionalOutput} from "../../../tokens/models/profissional-output";
import {v4 as uuidv4} from "uuid";
import {EspecialidadeModel} from "../../../tokens/models/especialidade-model";
import {ProfissionalInput} from "../../../tokens/models/profissional-input";

class EspecialidadeForm {
  public nome: FormControl<string | null>;
  public id: FormControl<string | null>;
}

@Component({
  selector: 'app-cadastro-especialidade',
  templateUrl: './cadastro-especialidade.component.html',
  styleUrl: './cadastro-especialidade.component.scss'
})
export class CadastroEspecialidadeComponent implements OnInit {
  public carregado = false;
  public formGroup: FormGroup<EspecialidadeForm>;

  private especialidade: EspecialidadeModel;
  private editando = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CadastroEspecialidadeService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.setNovoProfissional();
      } else {
        this.setEditandoProfissional(id);
      }
    });
  }

  public salvar(): void {
    const especialidade = {
      ...this.formGroup.value
    } as EspecialidadeModel;

    const request = this.editando
      ? this.service.update(this.especialidade.id, especialidade)
      : this.service.create(especialidade);

    const successMsg = this.editando
     ? "Especialidade alterado com sucesso"
     : "Especialidade criada com sucesso";

    request.pipe(first()).subscribe({
      next: () => {
        this.messageService.add({ summary: successMsg, severity: 'success' });
        this.router.navigate(['/auth/dashboard-adm'])
      }
    });
  }

  private setNovoProfissional(): void {
    this.especialidade = new ProfissionalOutput();
    this.especialidade.id = uuidv4();
    this.editando = false;
    this.createForm();
  }

  private setEditandoProfissional(id: string): void {
    this.service.getById(id).pipe(first()).subscribe({
      next: result => {
        this.especialidade = result;
        this.editando = true;
        this.createForm();
      },
      error: () => this.setNovoProfissional()
    })
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group<EspecialidadeForm>({
      id: new FormControl(this.especialidade.id, { validators: [Validators.required] }),
      nome: new FormControl(this.especialidade.nome, { validators: [Validators.required] }),
    });

    this.carregado = true;
  }
}
