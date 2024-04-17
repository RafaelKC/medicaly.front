import {Genero} from "../enums/genero";
import {DiasSemana, TipoProfissional} from "../enums";

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
  public atuacoes: string[];
  public especialidades: string[];
  public tipo: TipoProfissional;
  public inicioExpediente: number;
  public fimExpediente: number;
  public diasAtendidos: DiasSemana[];
}
