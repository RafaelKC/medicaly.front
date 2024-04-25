import {Genero} from "../enums/genero";
import {DiasSemana, TipoProfissional} from "../enums";
import {EspecialidadeModel} from "./especialidade-model";

export class ProfissionalOutput {
  public id: string
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public email: string;
  public telefone: string;
  public dataNascimento: Date;
  public enderecoId: string;
  public genero: Genero;
  public credencialDeSaude: string;
  public atuacoes: EspecialidadeModel[];
  public especialidades: EspecialidadeModel[];
  public tipo: TipoProfissional;
  public inicioExpediente: number;
  public fimExpediente: number;
  public diasAtendidos: DiasSemana[];

  public get atuacoesIds(): string[] {
    return this.atuacoes?.map(a => a.id).filter(a => a);
  }
  public get especialidadesIds(): string[] {
    return this.especialidades?.map(a => a.id).filter(a => a);
  }
}
