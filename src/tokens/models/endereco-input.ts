import {EntityDto} from "./entity-dto";

export class EnderecoInput extends EntityDto {
  public cep: string;
  public estado: string;
  public logradouro: string;
  public numero: number;
  public bairro: string;
  public cidade: string;
  public codigoIbgeCidade: string;
  public complemento: string;
  public observacao: string;
}
