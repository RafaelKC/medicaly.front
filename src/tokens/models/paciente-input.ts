import {EntityDto} from "./entity-dto";
import {IUser} from "../interfaces/i-user";
import {Genero} from "../enums/genero";

export class PacienteInput extends EntityDto implements IUser {
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public email: string;
  public telefone: string;
  public dataNascimento: Date;
  public enderecoId: string | null;
  public genero: Genero;
  public senha: string;
}
