import {EntityDto} from "./entity-dto";

export class AnexoComLinkOutput extends EntityDto {
  public downloadLink: string;
  public bucketEndereco: string;
  public dataUltimaModificacao: string;
  public extencao: string;
  public nome: string;
  public bucketPrefix: string;
}
