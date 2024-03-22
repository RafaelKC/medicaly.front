import {Genero} from "../enums/genero";

export interface IUser {
  id: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  genero: Genero;
}
