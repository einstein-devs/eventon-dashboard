import { NavBar } from "@/components/navbar";
import { Centro } from "@/entities/centro";
import { api } from "@/services/api";
import style from "@/styles/cursos.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function CentrosPage() {
  const [centros, setCentros] = useState<Centro[]>([]);

  useEffect(() => {
    getCentros();
  }, []);

  async function getCentros(search?: string) {
    try {
      let params: any = {};

      if (search) {
        params["search"] = search;
      }

      const response = await api.get("/centros", {
        params: params,
      });
      const responseData = response.data;

      setCentros(responseData["data"]);
    } catch {}
  }

  async function onChangeCentro(event: any) {
    let search = event.target.value;

    if (search || search == "") {
      await getCentros(search);
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.SearchWrapper}>
          <input
            type="text"
            placeholder="Pesquise pelo nome do centro"
            className={style.Input}
            onChange={(event) => onChangeCentro(event)}
          />
          <Link href="/criarCentro" className={style.CriarCursos}>
            Criar centro
          </Link>
        </section>

        <div className={style.DivCursos}>
          {centros.length == 0 && <p>Nenhum centro encontrado!</p>}

          {centros.length > 0 && (
            <table id="table">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Quantidade Cursos</th>
              </tr>
              {centros.map((centro) => {
                return (
                  <tr key={centro.id}>
                    <td>{centro.id}</td>
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
                        {centro.nome}
                      </p>
                    </td>
                    <td>{centro.quantidadeCursos}</td>
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
