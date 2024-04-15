import { EnderecoInput } from "./endereco-input";
import { UnidadeAtendimentoInput } from "./unidade-atendimento-input";

export class CreateUnidadeInput{
    id: string
    unidade: UnidadeAtendimentoInput;
    endereco: EnderecoInput;
}