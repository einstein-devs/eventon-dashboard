import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import style from "../styles/esqueci-senha.module.css";

export default function EsqueciSenha() {
  return (
    <div className={style.container}>
      <div className={style.conteudo}>
        <div className={style.h2}>
          <div className={style.form}>
            <Link href="./" className={style.voltar}>
              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17L1 9L11 1"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
            <span className={style.recuperar}>Recuperar senha</span>
            <br />
            <input
              className={style.input}
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email"
              required
            />
            <br />
            <Link href="/redefinir-senha" className={style.esqueciBtn}>
              Enviar recuperação
            </Link>
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
