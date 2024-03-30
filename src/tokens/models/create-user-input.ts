import {EnderecoInput} from "./endereco-input";
import {IUser} from "../interfaces/i-user";

export class CreateUserInput<T extends IUser> {
  public user: T;
  public password: string;
  public endereco: EnderecoInput
}
