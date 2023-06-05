export class Evento {
  id: string;
  titulo: string;
  descricao?: string;
  codigo: string;
  urlImagem?: string;
  usuario: {
    nome: string;
  };
  dataHoraInicio: Date;
  dataHoraTermino: Date;
  inscritos: number;
  local: {
    id: string;
    titulo: string;
    descricao?: string;
  };

  constructor({
    id,
    titulo,
    descricao,
    codigo,
    urlImagem,
    usuario,
    dataHoraInicio,
    dataHoraTermino,
    inscritos,
    local,
  }: Evento) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.codigo = codigo;
    this.urlImagem = urlImagem;
    this.usuario = usuario;
    this.dataHoraInicio = dataHoraInicio;
    this.dataHoraTermino = dataHoraTermino;
    this.inscritos = inscritos;
    this.local = local;
  }
}
