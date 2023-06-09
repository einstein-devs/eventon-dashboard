import { NavBar } from "@/components/navbar";
import { Aluno } from "@/entities/aluno";
import { api } from "@/services/api";
import style from "@/styles/alunos.module.css";
import { Pen, Trash } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    getAlunos();
  }, []);

  async function getAlunos(search?: string) {
    try {
      let params: any = {};

      if (search) {
        params["search"] = search;
      }

      const response = await api.get("/usuarios/alunos", {
        params: params,
      });
      const responseData = response.data;

      setAlunos(responseData["data"]);
    } catch {}
  }

  async function onChangeCurso(event: any) {
    let search = event.target.value;

    if (search || search == "") {
      await getAlunos(search);
    }
  }

  async function onClickDelete(codigoCurso: string) {
    try {
      await api.delete(`/usuarios/alunos/${codigoCurso}`);

      setAlunos([...alunos.filter((item) => item.codigo != codigoCurso)]);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Ocorreu um erro ao deletar aluno!",
        {
          closeButton: true,
          closeOnClick: true,
        }
      );
    }
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.SearchWrapper}>
          <input
            type="text"
            placeholder="Pesquise pelo nome ou e-mail do aluno"
            className={style.Input}
            onChange={(event) => onChangeCurso(event)}
          />
          <Link href="/criarAluno" className={style.CriarAlunos}>
            Criar aluno
          </Link>
        </section>

        <div className={style.DivAlunos}>
          {alunos.length == 0 && <p>Nenhum aluno encontrado!</p>}

          {alunos.length > 0 && (
            <table id="table">
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Curso</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
              {alunos.map((aluno) => {
                return (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.codigo}</td>
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
                        {aluno.nome}
                      </p>
                    </td>
                    <td>{aluno.email}</td>
                    <td>{aluno?.curso?.nome ?? "-"}</td>
                    <td>{aluno.cargo.posicao}</td>
                    <td>
                      <Link href={`/editarAluno/${aluno.codigo}`}>
                        <Pen />
                      </Link>
                      <button onClick={() => onClickDelete(aluno.codigo)}>
                        <Trash />
                      </button>
                    </td>
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
