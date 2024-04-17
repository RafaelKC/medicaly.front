
import { TipoUnidade } from '../enums/tipo-unidade';
import {EntityDto} from "./entity-dto";

export class UnidadeAtendimentoOutput extends EntityDto {
  public nome: string;
  public tipoUnidade: TipoUnidade;
  public enderecoId: string;
}
