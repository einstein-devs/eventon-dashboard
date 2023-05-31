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
          <Link href="/eventos" className={styles.linksMenu}>
            Alunos
          </Link>
          <Link href="/eventos" className={styles.linksMenu}>
            Coordenadores
          </Link>
          <Link
            href="/eventos"
            className={`${styles.linksMenu} ${
              route == "/eventos" && styles.linksMenuActive
            }`}
          >
            Eventos
          </Link>
        </div>

        <button onClick={signOut} className={styles.buttonSair}>
          Sair
        </button>
      </section>
    </div>
  );
}
