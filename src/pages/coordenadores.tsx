import { NavBar } from "@/components/navbar";
import { Usuario } from "@/entities/usuario";
import { api } from "@/services/api";
import style from "@/styles/cursos.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function CoordenadoresPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    getCoordenadores();
  }, []);

  async function getCoordenadores(search?: string) {
    try {
      let params: any = {};

      if (search) {
        params["search"] = search;
      }

      const response = await api.get("/usuarios/coordenadores", {
        params: params,
      });
      const responseData = response.data;

      setUsuarios(responseData["data"]);
    } catch {}
  }

  async function onChangeCentro(event: any) {
    let search = event.target.value;

    if (search || search == "") {
      await getCoordenadores(search);
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.SearchWrapper}>
          <input
            type="text"
            placeholder="Pesquise pelo nome do coordenador"
            className={style.Input}
            onChange={(event) => onChangeCentro(event)}
          />
          <Link href="/criarCoordenador" className={style.CriarCursos}>
            Criar coordenador
          </Link>
        </section>

        <div className={style.DivCursos}>
          {usuarios.length == 0 && <p>Nenhum coordenador encontrado!</p>}

          {usuarios.length > 0 && (
            <table id="table">
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Curso</th>
                <th>Cargo</th>
              </tr>
              {usuarios.map((coordenador) => {
                return (
                  <tr key={coordenador.id}>
                    <td>{coordenador.id}</td>
                    <td>{coordenador.codigo}</td>
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
                        {coordenador.nome}
                      </p>
                    </td>
                    <td>{coordenador.email}</td>
                    <td>{coordenador?.cursoCoordenado?.nome ?? "-"}</td>
                    <td>{coordenador.cargo.posicao}</td>
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
