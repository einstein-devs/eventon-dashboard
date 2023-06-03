import { NavBar } from "@/components/navbar";
import { Local } from "@/entities/local";
import { api } from "@/services/api";
import style from "@/styles/locais.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Locais() {
  const [locais, setLocais] = useState<Local[]>([]);

  useEffect(() => {
    getLocais();
  }, []);

  async function getLocais(search?: string) {
    try {
      let params: any = {};

      if (search) {
        params["search"] = search;
      }

      const response = await api.get("/locais", {
        params: params,
      });
      const responseData = await response.data;

      setLocais(responseData["data"]);
    } catch {}
  }

  async function onChangeLocal(event: any) {
    let search = event.target.value;

    if (search || search == "") {
      await getLocais(search);
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.SearchWrapper}>
          <input
            type="text"
            placeholder=" Pesquise pelo nome do local"
            className={style.Input}
            onChange={(event) => onChangeLocal(event)}
          />
          <Link href="/criarLocal" className={style.CriarLocais}>
            Criar local
          </Link>
        </section>

        <div className={style.DivLocais}>
          {locais.length == 0 && <p>Nenhum local encontrado!</p>}

          {locais.length > 0 && (
            <table id="table">
              <tr>
                <th>#</th>
                <th>Titulo</th>
                <th>Referência</th>
              </tr>
              {locais.map((local) => {
                return (
                  <tr key={local.id}>
                    <td
                      style={{
                        width: "200px",
                      }}
                    >
                      <p
                        style={{
                          textOverflow: "ellipsis",
                        }}
                      >
                        {local.id}
                      </p>
                    </td>
                    <td>{local.titulo}</td>
                    <td>{local.descricao ?? "-"}</td>
                  </tr>
                );
              })}
            </table>
          )}
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
