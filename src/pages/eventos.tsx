import style from "@/styles/eventos.module.css";
import App from "./_app";
import { FiPlusCircle } from "react-icons/fi";

export default function Eventos() {
  return (
    <div className={style.App}>
      <div className={style.Menu}>
        <div className={style.Div_Logo}>
          <img
            src="https://pbs.twimg.com/profile_images/540229261915746304/MFvI8XH3.png"
            alt="Imagem Logo Einstein"
            className={style.Logo}
          />
        </div>
        <div className={style.Div_Listagem}>
          <ul className={style.Listagem}>
            <li>
              <a href="#" className={style.Links_Menu}>
                Alunos
              </a>
            </li>
            <li>
              <a href="#" className={style.Links_Menu}>
                Coordenadores
              </a>
            </li>
            <li>
              <a href="#" className={style.Links_Menu}>
                Eventos
              </a>
            </li>
          </ul>
        </div>
        <div className={style.Div_Button_Sair}>
          <a href="#" className={style.Button_Sair}>
            Sair
          </a>
        </div>
      </div>

      <div className={style.Div_dashboard}>
        <form action="" className={style.Form_Pesquisa}>
          <input
            type="text"
            placeholder=" Pesquise pelo nome do evento"
            className={style.Input}
          />
        </form>
        <div className={style.DivEventos}>
          <a className={style.a} href="/infoEventos"><div className={style.EventoItem}><p className={style.p}>Evento 1</p></div></a>
          <a className={style.a} href="/infoEventos"><div className={style.EventoItem}><p className={style.p}>Evento 2</p></div></a>
          <a className={style.a} href="/infoEventos"><div className={style.EventoItem}><p className={style.p}>Evento 3</p></div></a>
          <a className={style.a} href="/infoEventos"><div className={style.EventoItem}><p className={style.p}>Evento 4</p></div></a>
        </div>
        <a href="/criarEventos" className={style.CriarEventos}>Criar eventos</a>
      </div>
    </div>
  );
}
