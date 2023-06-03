export class Curso {
  id: string;
  nome: string;
  ementa?: string;
  quantidadeAlunos: number;
  centro: {
    nome: string;
  };

  constructor(props: Curso) {
    this.id = props.id;
    this.nome = props.nome;
    this.ementa = props.ementa;
    this.quantidadeAlunos = props.quantidadeAlunos;
    this.centro = props.centro;
  }
}
