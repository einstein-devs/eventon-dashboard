export class Usuario {
  id: string;
  codigo: string;
  nome: string;
  email: string;
  cargo: {
    id: string;
    posicao: string;
  };
  cursoCoordenado: {
    nome: string;
  };
  curso: {
    nome: string;
  };

  constructor({
    id,
    cargo,
    codigo,
    email,
    nome,
    curso,
    cursoCoordenado,
  }: Usuario) {
    this.id = id;
    this.cargo = cargo;
    this.codigo = codigo;
    this.email = email;
    this.nome = nome;
    this.curso = curso;
    this.cursoCoordenado = cursoCoordenado;
  }
}
