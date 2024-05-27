import {DiasSemana, Genero, TipoProfissional} from "../enums";
import {UnidadeAtendimentoOutput} from "./unidade-atendimento-output";
import {EspecialidadeModel} from "./especialidade-model";

export class ResultadoInput {
  public procedimentoId?: string;
  public observacoes?: string
}
