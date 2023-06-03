import { AuthContext } from "@/contexts/auth.context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from "../styles/components/navbar.module.css";

export function NavBar() {
  const { route } = useRouter();

  const { signOut } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <img
        src="https://pbs.twimg.com/profile_images/540229261915746304/MFvI8XH3.png"
        alt="Imagem Logo Einstein"
        className={styles.logo}
      />

      <section className={styles.navbarContent}>
        <div className={styles.navbarItens}>
          <Link
            href="/alunos"
            className={`${styles.linksMenu} ${
              ["/alunos", "/criarAluno", "/alunos/[id]"].includes(route) &&
              styles.linksMenuActive
            }`}
          >
            Alunos
          </Link>
          <Link href="/eventos" className={styles.linksMenu}>
            Coordenadores
          </Link>
          <Link
            href="/eventos"
            className={`${styles.linksMenu} ${
              ["/eventos", "/criarEventos", "/eventos/[id]"].includes(route) &&
              styles.linksMenuActive
            }`}
          >
            Eventos
          </Link>
          <Link
            href="/locais"
            className={`${styles.linksMenu} ${
              ["/locais", "/criarLocal", "/locais/[id]"].includes(route) &&
              styles.linksMenuActive
            }`}
          >
            Locais
          </Link>
          <Link
            href="/cursos"
            className={`${styles.linksMenu} ${
              ["/cursos", "/criarCurso", "/cursos/[id]"].includes(route) &&
              styles.linksMenuActive
            }`}
          >
            Cursos
          </Link>
        </div>

        <button onClick={() => signOut()} className={styles.buttonSair}>
          Sair
        </button>
      </section>
    </div>
  );
}
