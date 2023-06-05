import { AuthContext } from "@/contexts/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import style from "../styles/login.module.css";

const schema = z.object({
  ra: z.string().nonempty("O RA é obrigatório"),
  senha: z.string().nonempty("A senha é obrigatória"),
});

type LoginFormData = z.infer<typeof schema>;

export default function TelaLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const { signIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: any) {
    try {
      setIsLoading(true);

      await signIn(data);
    } catch (error: any) {
      console.log("ER " + error.message);
      toast.error(error?.message ?? "Ocorreu um erro ao realizar login!", {
        closeButton: true,
        closeOnClick: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={style.limiter}>
      <div className={style.containerLogin}>
        <div className={style.wrapLogin}>
          <div className={style.loginForm}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style.loginFormTitle}
            >
              <span className={style.entrar}>Entrar</span>

              <div>
                <input
                  className={style.wrapRa}
                  type="text"
                  placeholder="Digite seu RA"
                  {...register("ra")}
                />
                {errors.ra && (
                  <span className={style.errorMessage}>
                    {errors.ra.message}
                  </span>
                )}
              </div>

              <br />

              <div>
                <input
                  className={style.wrapSenha}
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("senha")}
                />
                {errors.senha && (
                  <span className={style.errorMessage}>
                    {errors.senha.message}
                  </span>
                )}
              </div>

              <br />
              <div className={style.containerLoginFormBtn}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={style.loginFormBtn}
                >
                  {isLoading ? "Carregando..." : "Acessar"}
                </button>
                <br />
                <Link href="esqueci-senha" className={style.esqueceuSenha}>
                  Esqueceu sua senha?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "@eventon-dashboard.token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/eventos",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
