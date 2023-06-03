import { NavBar } from "@/components/navbar";
import { Local } from "@/entities/local";
import { api } from "@/services/api";
import style from "@/styles/criarEventos.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  localId: z.string().nonempty("O Local é obrigatório"),
  titulo: z.string().nonempty("O título é obrigatório"),
  dataHoraInicio: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "A data é obrigatória",
    }
  ),
  dataHoraTermino: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "A data é obrigatória",
    }
  ),
  descricao: z.string().optional(),
});

type LocalFormData = z.infer<typeof schema>;

export default function CriarEventos() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LocalFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locais, setLocais] = useState<Local[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    loadScreen();
  }, []);

  async function loadScreen() {
    setIsLoading(true);

    await Promise.all([getLocais()]);

    setIsLoading(false);
  }

  async function getLocais() {
    try {
      const response = await api.get("/locais");
      const responseData = await response.data;

      setLocais(responseData["data"]);
    } catch {}
  }

  async function onSubmit(formData: any) {
    try {
      setErrorMessage(null);
      setIsLoading(true);

      let isValid = validateDates(formData);

      if (isValid) {
        let dataToSend: any = {
          localId: formData.localId,
          titulo: formData.titulo,
          dataHoraInicio: formData.dataHoraInicio,
          dataHoraTermino: formData.dataHoraTermino,
        };

        if (formData["descricao"]) {
          dataToSend["descricao"] = formData.descricao;
        }
        console.log(formData);
        await api.post("/eventos", dataToSend);
        router.replace("/eventos");
      } else {
        setErrorMessage("A data de termino deve ser menor que a de inicio!");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Ocorreu um erro ao criar o evento!", {
        closeButton: true,
        closeOnClick: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function validateDates(formData: any) {
    const dataHoraInicio = new Date(formData.dataHoraInicio);
    const dataHoraTermino = new Date(formData.dataHoraTermino);

    return dataHoraInicio.valueOf() < dataHoraTermino.valueOf();
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
        <h1>Evento 1</h1>

        <div className={style.DivEventos}>
          <div className={style.EventoItem}></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={style.Form_Pesquisa}>
          <div>
            <select
              className={style.SelectInput}
              placeholder="Local"
              {...register("localId")}
            >
              <option value={""} disabled selected>
                Selecione um local
              </option>
              {locais.map((local) => {
                return <option value={local.id}>{local.titulo}</option>;
              })}
            </select>
            {errors.localId && (
              <span className={style.errorMessage}>
                {errors.localId.message}
              </span>
            )}
          </div>

          <section className={style.wrapperInputDates}>
            <div
              style={{
                width: "100%",
              }}
            >
              <label htmlFor="data-hora-inicio">Data hora início</label>
              <input
                className={style.inputDate}
                type="datetime-local"
                placeholder="Data e hora"
                {...register("dataHoraInicio")}
              />
              {errors.dataHoraInicio && (
                <span className={style.errorMessage}>
                  {errors.dataHoraInicio.message}
                </span>
              )}
            </div>

            <div
              style={{
                width: "100%",
              }}
            >
              <label htmlFor="data-hora-termino">Data hora término</label>
              <input
                className={style.inputDate}
                type="datetime-local"
                placeholder="Data e hora"
                {...register("dataHoraTermino")}
              />
              {errors.dataHoraTermino && (
                <span className={style.errorMessage}>
                  {errors.dataHoraTermino.message}
                </span>
              )}
            </div>
          </section>
          {errorMessage && (
            <span className={style.errorMessage}>{errorMessage}</span>
          )}

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
