import { NavBar } from "@/components/navbar";
import { api } from "@/services/api";
import style from "@/styles/criarLocal.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  titulo: z.string().nonempty("O título é obrigatório"),
  descricao: z.string().optional(),
});

type LocalFormData = z.infer<typeof schema>;

export default function CriarLocal() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<LocalFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(formData: LocalFormData) {
    try {
      setIsLoading(true);

      const dataToSend: any = {
        titulo: formData.titulo,
      };

      if (formData.descricao) {
        dataToSend["descricao"] = formData.descricao;
      }

      await api.post("/locais", dataToSend);
      router.replace("/locais");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Ocorreu um erro ao criar o local!",
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

          <h1>Cadastrar local</h1>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className={style.Form_Pesquisa}>
          <div>
            <input
              type="text"
              className={style.Input}
              placeholder="Título"
              {...register("titulo")}
            />
            {errors.titulo && (
              <span className={style.errorMessage}>
                {errors.titulo.message}
              </span>
            )}
          </div>

          <div>
            <textarea
              className={style.TextArea}
              placeholder="Descrição"
              {...register("descricao")}
            />
            {errors.descricao && (
              <span className={style.errorMessage}>
                {errors.descricao.message}
              </span>
            )}
          </div>

          <button className={style.loginFormBtn}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
