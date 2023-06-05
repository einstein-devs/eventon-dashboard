import { AuthContext } from "@/contexts/auth.context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styles from "../styles/components/navbar.module.css";

export function NavBar() {
  const { route } = useRouter();

  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={styles.navbar}>
      <img
        src="https://pbs.twimg.com/profile_images/540229261915746304/MFvI8XH3.png"
        alt="Imagem Logo Einstein"
        className={styles.logo}
      />

      <section className={styles.navbarContent}>
        <div className={styles.navbarItens}>
          {user?.cargo.posicao == "DIRETOR" && (
            <Link
              href="/alunos"
              className={`${styles.linksMenu} ${
                [
                  "/alunos",
                  "/criarAluno",
                  "/editarAluno/[id]",
                  "/alunos/[id]",
                ].includes(route) && styles.linksMenuActive
              }`}
            >
              Alunos
            </Link>
          )}
          {user?.cargo.posicao == "DIRETOR" && (
            <Link
              href="/coordenadores"
              className={`${styles.linksMenu} ${
                [
                  "/coordenadores",
                  "/criarCoordenador",
                  "/editarCoordenador/[id]",
                  "/coordenadores/[id]",
                ].includes(route) && styles.linksMenuActive
              }`}
            >
              Coordenadores
            </Link>
          )}
          <Link
            href="/eventos"
            className={`${styles.linksMenu} ${
              ["/eventos", "/criarEventos", "/eventos/[id]"].includes(route) &&
              styles.linksMenuActive
            }`}
          >
            Eventos
          </Link>
          {user?.cargo.posicao == "DIRETOR" && (
            <Link
              href="/locais"
              className={`${styles.linksMenu} ${
                ["/locais", "/criarLocal", "/locais/[id]"].includes(route) &&
                styles.linksMenuActive
              }`}
            >
              Locais
            </Link>
          )}
          {user?.cargo.posicao == "DIRETOR" && (
            <Link
              href="/centros"
              className={`${styles.linksMenu} ${
                ["/centros", "/criarCentro", "/centros/[id]"].includes(route) &&
                styles.linksMenuActive
              }`}
            >
              Centros
            </Link>
          )}
          {user?.cargo.posicao == "DIRETOR" && (
            <Link
              href="/cursos"
              className={`${styles.linksMenu} ${
                ["/cursos", "/criarCurso", "/cursos/[id]"].includes(route) &&
                styles.linksMenuActive
              }`}
            >
              Cursos
            </Link>
          )}
        </div>

        <div>
          <section
            style={{
              width: "100%",
              padding: 12,
            }}
          >
            <h3>{user?.nome}</h3>
            <h4>{user?.codigo}</h4>
            <p>{user?.cargo.posicao}</p>
          </section>

          <button onClick={() => signOut()} className={styles.buttonSair}>
            Sair
          </button>
        </div>
      </section>
    </div>
  );
}
