import { NavBar } from "@/components/navbar";
import { Local } from "@/entities/local";
import { api } from "@/services/api";
import style from "@/styles/criarEventos.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsImage, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  localId: z.string().nonempty("O Local é obrigatório"),
  titulo: z.string().nonempty("O título é obrigatório"),
  dataHoraInicio: z
    .string()
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      {
        message: "A data é obrigatória",
      }
    )
    .refine(
      (value) => {
        const date = new Date(value);
        return date.valueOf() > new Date().valueOf();
      },
      {
        message: "A data hora inicio deve ser maior que a data atual!",
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
  image: z
    .any()
    .refine(
      (files) => !files?.[0]?.size || files?.[0]?.size <= MAX_FILE_SIZE,
      `O tamanho máximo do arquivo é de 5MB.`
    )
    .refine(
      (files) =>
        !files?.[0]?.type || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Formato de imagem inválido."
    )
    .optional(),
});

type EventoFormData = z.infer<typeof schema>;

export default function CriarEventos() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<EventoFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locais, setLocais] = useState<Local[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const selectedImage = watch("image")?.[0];

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
      const responseData = response.data;

      setLocais(responseData["data"]);
    } catch {}
  }

  async function onSubmit(formData: EventoFormData) {
    try {
      setErrorMessage(null);
      setIsLoading(true);

      let isValid = validateDates(formData);

      if (isValid) {
        const dataToSend = new FormData();

        dataToSend.append("localId", formData.localId);
        dataToSend.append("titulo", formData.titulo);
        dataToSend.append("dataHoraInicio", formData.dataHoraInicio);
        dataToSend.append("dataHoraTermino", formData.dataHoraTermino);

        if (formData.descricao) {
          dataToSend.append("descricao", formData.descricao);
        }

        if (formData.image) {
          console.log(formData.image?.[0]);
          dataToSend.append("image", formData.image?.[0]);
        }

        await api.post("/eventos", dataToSend);
        router.replace("/eventos");
      } else {
        setErrorMessage("A data de termino deve ser menor que a de inicio!");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Ocorreu um erro ao criar o evento!",
        {
          closeButton: true,
          closeOnClick: true,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  function validateDates(formData: any) {
    const dataHoraInicio = new Date(formData.dataHoraInicio);
    const dataHoraTermino = new Date(formData.dataHoraTermino);

    return dataHoraInicio.valueOf() < dataHoraTermino.valueOf();
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
        {" "}
        <section className={style.header}>
          <button className={style.buttonVoltar} onClick={voltarPaginaAnterior}>
            <CaretLeft size={24} weight={"bold"} />
          </button>

          <h1>Cadastrar evento</h1>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className={style.Form_Pesquisa}>
          <div
            style={
              selectedImage && {
                position: "relative",
                backgroundImage: `url('${URL.createObjectURL(selectedImage)}')`,
              }
            }
            className={style.wrapperEnvioImagem}
          >
            {!selectedImage && <BsImage color="#ff9839" size={32} />}
            <BsPlusCircle
              className={style.plusIcon}
              color="#ff9839"
              size={42}
            />

            <input
              className={style.inputEnvioImagem}
              type="file"
              id="image"
              {...register("image")}
            />
          </div>
          {errors.image && (
            <span
              className={style.errorMessage}
            >{`${errors.image.message}`}</span>
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

          <button className={style.loginFormBtn}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
