import { TipoUnidade } from '../enums/tipo-unidade';

export class UnidadeAtendimentoInput {
  public nome?: string;
  public tipoUnidade: TipoUnidade;
  public enderecoId: string;
}
