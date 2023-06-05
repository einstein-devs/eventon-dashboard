import { NavBar } from "@/components/navbar";
import { Evento } from "@/entities/evento";
import { Local } from "@/entities/local";
import { api } from "@/services/api";
import style from "@/styles/criarEventos.module.css";
import { formatarDataBanco } from "@/utils/formater";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsImage, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { z } from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z
  .object({
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
  })
  .superRefine(({ dataHoraInicio, dataHoraTermino }, ctx) => {
    if (dataHoraInicio.valueOf() > dataHoraTermino.valueOf()) {
      ctx.addIssue({
        path: ["dataHoraTermino"],
        code: "custom",
        message:
          "A data hora término tem que ser maior que a data hora início!",
      });
    }
  });

type EditarEventoProps = {
  evento: Evento;
  locais: Local[];
};

type EventoFormData = z.infer<typeof schema>;

export default function EditarEvento({ locais, evento }: EditarEventoProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EventoFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const selectedImage = watch("image")?.[0];

  useEffect(() => {
    setValue("titulo", evento.titulo);
    setValue("localId", evento.local.id);
    setValue("dataHoraInicio", formatarDataBanco(evento.dataHoraInicio));
    setValue("dataHoraTermino", formatarDataBanco(evento.dataHoraTermino));
  }, []);

  async function onSubmit(formData: EventoFormData) {
    try {
      setIsLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("TETE", "TETETE");

      dataToSend.append("localId", formData.localId);
      dataToSend.append("titulo", formData.titulo);
      dataToSend.append("dataHoraInicio", formData.dataHoraInicio);
      dataToSend.append("dataHoraTermino", formData.dataHoraTermino);

      if (formData.descricao) {
        dataToSend.append("descricao", formData.descricao);
      }

      if (formData.image) {
        dataToSend.append("image", formData.image?.[0]);
      }

      await api.put(`/eventos/${router.query["id"]}`, dataToSend);
      await router.replace("/eventos");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ??
          "Ocorreu um erro ao atualizar o evento!",
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

          <h1>Atualizar evento</h1>
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
                return (
                  <option key={local.id} value={local.id}>
                    {local.titulo}
                  </option>
                );
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

          <button disabled={isLoading} className={style.loginFormBtn}>
            {isLoading ? "Carregando..." : "Editar evento"}
          </button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<EditarEventoProps> = async (
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
    const responseCursos = await api.get("/locais", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const locais = responseCursos.data["data"];

    const responseEventos = await api.get(`/eventos/${context.query["id"]}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const evento = responseEventos.data["data"];

    return {
      props: {
        evento,
        locais,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/eventos",
        permanent: false,
      },
    };
  }
};
