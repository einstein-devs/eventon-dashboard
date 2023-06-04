import { NavBar } from "@/components/navbar";
import { Curso } from "@/entities/curso";
import { api } from "@/services/api";
import style from "@/styles/criarLocal.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z.string().nonempty("O email é obrigatório").email(),
  cursoId: z.string().nonempty("O curso é obrigatório"),
});

type CoordenadorFormData = z.infer<typeof schema>;

export default function CriarCoordenador() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    getCursos();
  }, []);

  async function getCursos() {
    try {
      const response = await api.get("/cursos", {
        params: {
          somenteSemCoordenadores: true,
        },
      });
      const responseData = response.data;

      setCursos(responseData["data"]);
    } catch {}
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CoordenadorFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(formData: CoordenadorFormData) {
    try {
      setIsLoading(true);

      console.log(formData);

      await api.post("/usuarios/create/coordenador", formData);
      router.replace("/coordenadores");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Ocorreu um erro ao criar o coordenador!",
        {
          closeButton: true,
          closeOnClick: true,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

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

          <h1>Cadastrar coordenador</h1>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className={style.Form_Pesquisa}>
          <div>
            <input
              type="text"
              className={style.Input}
              placeholder="Nome"
              {...register("nome")}
            />
            {errors.nome && (
              <span className={style.errorMessage}>{errors.nome.message}</span>
            )}
          </div>

          <div>
            <input
              type="email"
              className={style.Input}
              placeholder="E-mail"
              {...register("email")}
            />
            {errors.email && (
              <span className={style.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          <div>
            <select
              className={style.SelectInput}
              placeholder="Local"
              {...register("cursoId")}
            >
              <option value={""} disabled selected>
                Selecione um curso
              </option>
              {cursos.map((curso) => {
                return <option value={curso.id}>{curso.nome}</option>;
              })}
            </select>
            {errors.cursoId && (
              <span className={style.errorMessage}>
                {errors.cursoId.message}
              </span>
            )}
          </div>

          <p
            style={{
              color: "red",
            }}
          >
            Senha de aluno gerada automaticamente com o mesmo numero de código!
          </p>

          <button disabled={isLoading} className={style.loginFormBtn}>
            {isLoading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
