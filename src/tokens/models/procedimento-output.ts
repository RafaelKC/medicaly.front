
import {TipoProcedimento} from "../enums/tipo-procedimento";
import {StatusProcedimento} from "../enums/status-procedimento";
import {PacienteOutput} from "./paciente-output";
import {ProfissionalOutput} from "./profissional-output";
import {UnidadeAtendimentoOutput} from "./unidade-atendimento-output";

export class ProcedimentoOutput{
  public id: string;
  public tipoProcedimento: TipoProcedimento;
  public status: StatusProcedimento;
  public codigoTuss: string;
  public paciente: PacienteOutput;
  public profissional: ProfissionalOutput;
  public unidadeAtendimento: UnidadeAtendimentoOutput;
  public data: Date;
  public idProfissional: string;
  public idPaciente: string;
  public idUnidadeAtendimento: string
}
