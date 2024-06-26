import {Genero} from "../enums/genero";

export interface IUser {
  id: string;
  nome: string;
  cpf: string;
  sobrenome: string;
  telefone: string;
  email: string;
  dataNascimento: Date;
  genero: Genero;
}
