import {DiasSemana, Genero, TipoProfissional} from "../enums";

export class ProfissionalInput {
  public id?: string
  public nome?: string | null;
  public sobrenome?: string | null;
  public cpf?: string | null;
  public email?: string | null;
  public telefone?: string | null;
  public dataNascimento?: Date | null;
  public enderecoId?: string | null;
  public genero?: Genero | null;
  public credencialDeSaude?: string | null;
  public atuacoesIds?: string[] | null;
  public especialidadesIds?: string[] | null;
  public tipo?: TipoProfissional | null;
  public inicioExpediente?: number | null;
  public fimExpediente?: number | null;
  public diasAtendidos?: DiasSemana[] | null;
  public unidadeId: string | null;
}
