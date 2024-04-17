import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  CPF_MASK,
  EnderecoInput,
  GenericValidators,
  Genero,
  stringIsNullOrEmptyOrWhitespace,
  TELEFONE_MASK
} from "../../../tokens";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateAdministradorService} from "./create-administrador.service";
import {v4 as uuidv4} from "uuid"
import {CreateAdministradorInput} from "../../../tokens/models/create-administrador-input";
import {AdministradorModel} from "../../../tokens/models/administrador-model";
import {first} from "rxjs";
import {UnidadeAtendimentoInput} from "../../../tokens/models/unidade-atendimento-input";

class AdministradorForm {
  public nome: FormControl<string|null>;
  public sobrenome: FormControl<string|null>;
  public cpf: FormControl<string|null>;
  public email: FormControl<string|null>;
  public telefone: FormControl<string|null>;
  public dataNascimento: FormControl<Date|null>;
  public genero: FormControl<Genero|null>;
  public senha: FormControl<string|null>;
}

@Component({
  selector: 'app-cadastro-administrador',
  templateUrl: './cadastro-administrador.component.html',
  styleUrl: './cadastro-administrador.component.scss'
})
export class CadastroAdministradorComponent implements OnInit {
  public carregado = false;
  public etapaAdministradorFinalizado = false;

  public cpfMask = CPF_MASK;
  public telefoneMask = TELEFONE_MASK;

  public formGroup: FormGroup<AdministradorForm>;
  public minDate: Date = new Date('01-01-1940');
  public maxDate = new Date();
  public generos = Genero;

  public editando = false;
  public administrador: AdministradorModel;

  constructor(
    private formBuilder: FormBuilder,
    private service: CreateAdministradorService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.setNovoAdministrador();
      } else {
        this.setAdministradorEditar(id);
      }
    })
  }

  public prosseguir(): void {
    if (!this.editando) {
      this.etapaAdministradorFinalizado = true
    } else {
      const administrador = {
        ...this.formGroup.value,
        enderecoId: this.administrador.enderecoId,
      } as AdministradorModel;

      this.service.update(this.administrador.id, administrador).pipe(first())
        .subscribe(() => {
          this.messageService.add({ summary: 'Administrador atualizada crom sucesso', severity: 'success' });
          this.router.navigate(['/auth/dashboard-adm'])
        })
    }
  }

  public setEndereco(endereco: EnderecoInput): void {
    const profissional = this.formGroup.value;
    const createInput = new CreateAdministradorInput();

    endereco.id ??= uuidv4();

    createInput.password = this.formGroup.value.senha as string;
    createInput.endereco = endereco;
    createInput.administrador = {
      id: uuidv4(),
      enderecoId: endereco.id,
      ...profissional
    } as AdministradorModel;

    this.service.create(createInput).pipe(first()).subscribe({
      next: () => {
        this.messageService.add({ summary: 'Administrador criado com sucesso', severity: 'success' });
        this.router.navigate(['/auth/dashboard-adm'])
      }
    });
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group<AdministradorForm>({
      nome: new FormControl(this.administrador.nome, { validators: [Validators.required] }),
      sobrenome: new FormControl(this.administrador.sobrenome, { validators: [Validators.required] }),
      email: new FormControl(this.administrador.email, { validators: [Validators.required, Validators.email] }),
      telefone: new FormControl(this.administrador.telefone, { validators: [
          Validators.minLength(10), Validators.maxLength(11), Validators.required ] }),
      cpf: new FormControl(this.administrador.cpf, { validators: [
          Validators.minLength(11), Validators.maxLength(11),
          Validators.required, GenericValidators.isValidCpf() ] }),
      dataNascimento: new FormControl(this.administrador.dataNascimento, { validators: [Validators.required], nonNullable: true }),
      genero: new FormControl(this.administrador.genero, { validators: [Validators.required] }),
      senha: new FormControl('', { validators: this.editando ? [] : [Validators.required] }),
    });

    this.carregado = true;
  }

  private setNovoAdministrador(): void {
    this.administrador = new AdministradorModel();
    this.administrador.genero = Genero.Masculino;
    this.createForm();
  }

  private setAdministradorEditar(id: string): void {
    this.service.get(id).pipe(first())
      .subscribe({
        next: (administrador) => {
          this.administrador = administrador;
          this.editando = true;
          this.createForm();
        },
        error: () => this.setNovoAdministrador()
      })
  }
}
