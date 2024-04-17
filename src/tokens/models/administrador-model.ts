import {EntityDto} from "./entity-dto";
import {IUser} from "../interfaces";
import {Genero} from "../enums";

export class AdministradorModel extends EntityDto implements IUser {
  public dataNascimento: Date;
  public email: string;
  public genero: Genero;
  public nome: string;
  public sobrenome: string;
  public telefone: string;
  public cpf: string;
  public enderecoId: string;
}
