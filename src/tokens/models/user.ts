import {Genero, UserTipo} from "../enums";

export class User {
  public id: string;
  public nome: string;
  public sobrenome: string;
  public telefone: string;
  public email: string;
  public dataNascimento: Date;
  public genero: Genero;
  public tipo: UserTipo
}
