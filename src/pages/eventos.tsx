import { NavBar } from "@/components/navbar";
import { Evento } from "@/entities/evento";
import { api } from "@/services/api";
import style from "@/styles/eventos.module.css";
import { HOST_API } from "@/utils/api-config";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    getEventos();
  }, []);

  async function getEventos() {
    try {
      const response = await api.get("/eventos");
      const responseData = await response.data;

      setEventos(responseData["data"]);
    } catch {}
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <form action="" className={style.Form_Pesquisa}>
          <input
            type="text"
            placeholder=" Pesquise pelo nome do evento"
            className={style.Input}
          />
        </form>
        <div className={style.DivEventos}>
          {eventos.map((evento) => {
            return (
              <a className={style.a} href="/infoEventos">
                <div
                  style={
                    evento.urlImagem
                      ? {
                          backgroundImage: `url('${HOST_API}/imagens/${evento.urlImagem}')`,
                        }
                      : {
                          background: "gray",
                        }
                  }
                  className={style.EventoItem}
                >
                  <p className={style.p}>{evento.titulo}</p>
                </div>
              </a>
            );
          })}
        </div>
        <a href="/criarEventos" className={style.CriarEventos}>
          Criar eventos
        </a>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "@eventon-dashboard.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
