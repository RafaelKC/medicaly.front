import {EntityDto} from "./entity-dto";

export class AnexoComLinkOutput extends EntityDto {
  public downloadLink: string;
  public BucketEndereco: string;
  public DataUltimaModificacao: string;
  public Extencao: string;
  public Nome: string;
  public BucketPrefix: string;
}
