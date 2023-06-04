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
  nome: z.string().nonempty("O nome é obrigatório"),
});

type AlunoFormData = z.infer<typeof schema>;

export default function CriarCentro() {
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

      await api.post("/centros", formData);
      router.replace("/centros");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Ocorreu um erro ao criar o centro!",
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

          <h1>Cadastrar centro</h1>
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

          <button disabled={isLoading} className={style.loginFormBtn}>
            {isLoading ? "Loading" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
