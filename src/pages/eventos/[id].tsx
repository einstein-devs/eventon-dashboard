import { NavBar } from "@/components/navbar";
import { Evento } from "@/entities/evento";
import { api } from "@/services/api";
import style from "@/styles/infoEventos.module.css";
import { HOST_API } from "@/utils/api-config";
import { formatarData } from "@/utils/formater";
import { CaretLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

type InfoEventos = {
  evento: Evento;
};

export default function InfoEventos(props: InfoEventos) {
  const [evento, setEvento] = useState<Evento>(props.evento);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dataAtual = new Date();
  const router = useRouter();

  function voltarPaginaAnterior() {
    router.back();
  }

  function isFinalizado(): boolean {
    return new Date(evento.dataHoraTermino).valueOf() <= dataAtual.valueOf();
  }

  function isIniciado(): boolean {
    return (
      new Date(evento.dataHoraTermino).valueOf() > dataAtual.valueOf() &&
      new Date(evento.dataHoraInicio).valueOf() <= dataAtual.valueOf()
    );
  }

  async function gerarCodigo() {
    try {
      setIsLoading(true);

      const response = await api.post(`/eventos/gerar-codigo/${evento.id}`);
      setEvento({
        ...evento,
        codigo: response.data["data"].codigo,
      });
      toast.success("Código de evento gerado com sucesso!", {
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Ocorreu um erro ao gerar código de evento!",
        {
          closeButton: true,
          closeOnClick: true,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.header}>
          <button className={style.buttonVoltar} onClick={voltarPaginaAnterior}>
            <CaretLeft size={24} weight={"bold"} />
          </button>

          <h1>{evento.titulo}</h1>
        </section>

        <div className={style.DivEventos}>
          <div
            style={
              evento.urlImagem
                ? {
                    backgroundImage: `url('${HOST_API}/imagens/${evento.urlImagem}')`,
                  }
                : {}
            }
            className={style.EventoItem}
          ></div>
        </div>

        <div className={style.wrapperInfo}>
          <p>Local: {evento.local.titulo}</p>
          <p>Refêrencia do local: {evento.local.descricao}</p>
          <br />
          <p>Data e hora de início: {formatarData(evento.dataHoraInicio)}</p>
          <p>Data e hora de término: {formatarData(evento.dataHoraTermino)}</p>
          <br />
          <p>Inscritos: {evento.inscritos}</p>

          {evento.descricao && <p>Descrição: {evento.descricao}</p>}
          <br />

          {evento.codigo && (
            <p
              style={{
                fontSize: 24,
              }}
            >
              Código: {evento.codigo}
            </p>
          )}
        </div>

        {!evento.codigo && isIniciado() && (
          <button
            disabled={isLoading}
            onClick={gerarCodigo}
            className={style.loginFormBtn}
          >
            {isLoading ? "Carregando..." : "Gerar código"}
          </button>
        )}

        {!evento.codigo && !isIniciado() && isFinalizado() && (
          <p
            style={{
              color: "red",
              textDecoration: "underline",
            }}
          >
            Aguarde o início do evento para gerar o código!
          </p>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<InfoEventos> = async (
  context
) => {
  try {
    const eventoId = context.query.id;

    const response = await api.get(`/eventos/${eventoId}`);
    const data = response.data["data"];

    return {
      props: {
        evento: data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/eventos",
        permanent: false,
      },
    };
  }
};
