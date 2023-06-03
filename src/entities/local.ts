export class Local {
  id: string;
  titulo: string;
  descricao?: string;

  constructor({ id, titulo, descricao }: Local) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
  }
}
