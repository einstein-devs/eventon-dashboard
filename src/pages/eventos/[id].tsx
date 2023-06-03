import { NavBar } from "@/components/navbar";
import { Evento } from "@/entities/evento";
import { api } from "@/services/api";
import style from "@/styles/infoEventos.module.css";
import { HOST_API } from "@/utils/api-config";
import { formatarData } from "@/utils/formater";
import { CaretLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type InfoEventos = {
  evento: Evento;
};

export default function InfoEventos({ evento }: InfoEventos) {
  const router = useRouter();

  function voltarPaginaAnterior() {
    router.back();
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

          {evento.codigo && <p>Código do curso: {evento.codigo}</p>}
        </div>

        {!evento.codigo && (
          <button className={style.loginFormBtn}>Gerar código</button>
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
