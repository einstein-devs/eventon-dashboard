import { NavBar } from "@/components/navbar";
import { Evento } from "@/entities/evento";
import { api } from "@/services/api";
import style from "@/styles/eventos.module.css";
import { HOST_API } from "@/utils/api-config";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    getEventos();
  }, []);

  async function getEventos(search?: string) {
    try {
      let params: any = {};

      if (search) {
        params["search"] = search;
      }

      const response = await api.get("/eventos", {
        params: params,
      });
      const responseData = await response.data;

      setEventos(responseData["data"]);
    } catch {}
  }

  async function onChangeEvento(event: any) {
    let search = event.target.value;

    if (search || search == "") {
      await getEventos(search);
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.SearchWrapper}>
          <input
            type="text"
            placeholder=" Pesquise pelo nome do evento"
            className={style.Input}
            onChange={(event) => onChangeEvento(event)}
          />
          <Link href="/criarEventos" className={style.CriarEventos}>
            Criar eventos
          </Link>
        </section>

        <div className={style.DivEventos}>
          {eventos.length == 0 && (
            <div>
              <p>Nenhum evento foi encontrado!</p>
            </div>
          )}
          {eventos.map((evento) => {
            return (
              <Link key={evento.id} className={style.a} href="/infoEventos">
                <div
                  style={
                    evento.urlImagem
                      ? {
                          backgroundImage: `url('${HOST_API}/imagens/${evento.urlImagem}')`,
                        }
                      : {
                          background: "#f5f5f5",
                        }
                  }
                  className={style.EventoItem}
                >
                  <p className={style.p}>{evento.titulo}</p>
                </div>
              </Link>
            );
          })}
        </div>
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
