import {EnderecoInput} from "./endereco-input";
import {AdministradorModel} from "./administrador-model";

export class CreateAdministradorInput {
  public administrador: AdministradorModel;
  public endereco: EnderecoInput;
  public password: string;
}
