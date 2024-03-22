import {EnderecoInput} from "./endereco-input";

export class CreateUserInput<T> {
  public user: T;
  public password: string;
  public endereco: EnderecoInput
}
