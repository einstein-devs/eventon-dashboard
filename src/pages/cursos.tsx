import { NavBar } from "@/components/navbar";
import { Curso } from "@/entities/curso";
import { api } from "@/services/api";
import style from "@/styles/cursos.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    getCursos();
  }, []);

  async function getCursos(search?: string) {
    try {
      let params: any = {};

      if (search) {
        params["search"] = search;
      }

      const response = await api.get("/cursos", {
        params: params,
      });
      const responseData = response.data;

      setCursos(responseData["data"]);
    } catch {}
  }

  async function onChangeCurso(event: any) {
    let search = event.target.value;

    if (search || search == "") {
      await getCursos(search);
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.SearchWrapper}>
          <input
            type="text"
            placeholder="Pesquise pelo nome do curso"
            className={style.Input}
            onChange={(event) => onChangeCurso(event)}
          />
          <Link href="/criarCurso" className={style.CriarCursos}>
            Criar curso
          </Link>
        </section>

        <div className={style.DivCursos}>
          {cursos.length == 0 && <p>Nenhum curso encontrado!</p>}

          {cursos.length > 0 && (
            <table id="table">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Ementa</th>
                <th>Centro</th>
                <th>Quantidade Alunos</th>
              </tr>
              {cursos.map((curso) => {
                return (
                  <tr key={curso.id}>
                    <td>{curso.id}</td>
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
                        {curso.nome}
                      </p>
                    </td>
                    <td>{curso.ementa ?? "-"}</td>
                    <td>{curso.centro.nome}</td>
                    <td>{curso.quantidadeAlunos}</td>
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
