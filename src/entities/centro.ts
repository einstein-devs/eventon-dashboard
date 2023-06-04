export class Centro {
  id: string;
  nome: string;
  quantidadeCursos: number;

  constructor(props: Centro) {
    this.id = props.id;
    this.nome = props.nome;
    this.quantidadeCursos = props.quantidadeCursos;
  }
}
