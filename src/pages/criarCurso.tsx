import { NavBar } from "@/components/navbar";
import { Centro } from "@/entities/centro";
import { api } from "@/services/api";
import style from "@/styles/criarLocal.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  ementa: z.string().optional(),
  centroId: z.string().nonempty("O centro é obrigatório"),
});

type AlunoFormData = z.infer<typeof schema>;

type CriarCursoProps = {
  centros: Centro[];
};

export default function CriarCurso({ centros }: CriarCursoProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<AlunoFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(formData: AlunoFormData) {
    try {
      setIsLoading(true);

      await api.post("/cursos", formData);
      router.replace("/alunos");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Ocorreu um erro ao criar o curso!",
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

  if (isLoading) {
    return (
      <div className={style.App}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={style.App}>
      <NavBar />

      <div className={style.Div_dashboard}>
        <section className={style.header}>
          <button className={style.buttonVoltar} onClick={voltarPaginaAnterior}>
            <CaretLeft size={24} weight={"bold"} />
          </button>

          <h1>Cadastrar curso</h1>
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
            <textarea
              className={style.TextArea}
              placeholder="Descrição"
              {...register("ementa")}
            />
            {errors.ementa && (
              <span className={style.errorMessage}>
                {errors.ementa.message}
              </span>
            )}
          </div>

          <div>
            <select
              className={style.SelectInput}
              placeholder="Centro"
              {...register("centroId")}
            >
              <option value={""} disabled selected>
                Selecione um centro
              </option>
              {centros.map((centro) => {
                return <option value={centro.id}>{centro.nome}</option>;
              })}
            </select>
            {errors.centroId && (
              <span className={style.errorMessage}>
                {errors.centroId.message}
              </span>
            )}
          </div>

          <button className={style.loginFormBtn}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CriarCursoProps> = async (
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
    const response = await api.get(`/centros`);
    const data = response.data["data"];

    return {
      props: {
        centros: data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/cursos",
        permanent: false,
      },
    };
  }
};
