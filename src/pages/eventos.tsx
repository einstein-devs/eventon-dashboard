import { NavBar } from "@/components/navbar";
import { Evento } from "@/entities/evento";
import { api } from "@/services/api";
import style from "@/styles/eventos.module.css";
import { HOST_API } from "@/utils/api-config";
import { Gear } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type EventosProps = {
  eventos: Evento[];
  error?: string;
};

export default function Eventos(props: EventosProps) {
  const dataAtual = new Date();
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    if (props.error) {
      toast.error(props.error);
    }

    setEventos(props.eventos);
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
      const responseData = response.data;

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
            placeholder="Pesquise pelo nome do evento"
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
            const isFinalizado =
              new Date(evento.dataHoraTermino).valueOf() <= dataAtual.valueOf();

            return (
              <Link
                key={evento.id}
                className={style.a}
                href={`/eventos/${evento.id}`}
              >
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
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className={style.p}>{evento.titulo}</p>
                    {!isFinalizado && (
                      <Link
                        href={`/editarEventos/${evento.id}`}
                        className="text-2xl bg-white"
                      >
                        <Gear />
                      </Link>
                    )}
                    {isFinalizado && (
                      <div className="bg-white px-4">
                        <p className="text-red-500">Evento finalizado!</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<EventosProps> = async (
  context
) => {
  const { "@eventon-dashboard.token": token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const response = await api.get(`/eventos/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data["data"];

    return {
      props: {
        eventos: data,
      },
    };
  } catch {
    return {
      props: {
        eventos: [],
        error: "Ocorreu um erro ao buscar eventos!",
      },
    };
  }
};
