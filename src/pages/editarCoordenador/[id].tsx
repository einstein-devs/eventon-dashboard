import { NavBar } from "@/components/navbar";
import { Curso } from "@/entities/curso";
import { Usuario } from "@/entities/usuario";
import { api } from "@/services/api";
import style from "@/styles/criarLocal.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
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

type EditarCoordenadorProps = {
  user: Usuario;
  cursos: Curso[];
};

export default function EditarCoordenador({
  user,
  cursos,
}: EditarCoordenadorProps) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CoordenadorFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setValue("nome", user.nome);
    setValue("email", user.email);
    setValue("cursoId", user.cursoCoordenado.id);
  }, []);

  async function onSubmit(formData: CoordenadorFormData) {
    try {
      setIsLoading(true);

      await api.put(
        `/usuarios/coordenadores/${router.query["id"]}/update`,
        formData
      );
      await router.replace("/coordenadores");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Ocorreu um erro ao atualizar coordenador!",
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

          <h1>Editar coordenador</h1>
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
              placeholder="Curso"
              {...register("cursoId")}
            >
              {cursos.map((curso) => {
                if (user.cursoCoordenado.id == curso.id) {
                  return (
                    <option key={curso.id} value={curso.id} disabled selected>
                      {curso.nome}
                    </option>
                  );
                }

                return (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                );
              })}
            </select>
            {errors.cursoId && (
              <span className={style.errorMessage}>
                {errors.cursoId.message}
              </span>
            )}
          </div>

          <button className={style.loginFormBtn}>Atualizar</button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  EditarCoordenadorProps
> = async (context) => {
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
    const responseCursos = await api.get("/cursos", {
      params: {
        somenteSemCoordenadores: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cursos = responseCursos.data["data"];

    const responseUsuario = await api.get(`/usuarios/${context.query["id"]}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = responseUsuario.data["data"];

    return {
      props: {
        user,
        cursos,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/coordenadores",
        permanent: false,
      },
    };
  }
};
