export class Aluno {
  id: string;
  codigo: string;
  nome: string;
  email: string;
  cargo: {
    posicao: string;
  };
  curso?: {
    nome: string;
  };

  constructor(props: Aluno) {
    this.id = props.id;
    this.nome = props.nome;
    this.codigo = props.codigo;
    this.email = props.email;
    this.cargo = props.cargo;
    this.curso = props.curso;
  }
}
