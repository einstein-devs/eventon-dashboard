export class Curso {
  id: string;
  nome: string;
  ementa?: string;
  quantidadeAlunos: number;
  coordenador: {
    id: string;
    nome: string;
  };
  centro: {
    nome: string;
  };

  constructor(props: Curso) {
    this.id = props.id;
    this.nome = props.nome;
    this.ementa = props.ementa;
    this.quantidadeAlunos = props.quantidadeAlunos;
    this.coordenador = props.coordenador;
    this.centro = props.centro;
  }
}
