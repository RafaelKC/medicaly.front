import {Genero, UserTipo} from "../enums";
import {TipoProcedimento} from "../enums/tipo-procedimento";
import {StatusProcedimento} from "../enums/status-procedimento";

export class ProcedimentoOutput {
  public id: string;
  public tipoProcedimento: TipoProcedimento;
  public status: StatusProcedimento;
  public codigoTuss: string;
  public data: Date;
  public idProfissional: string;
  public idPaciente: string;
  public idUnidadeAtendimento: string
}
