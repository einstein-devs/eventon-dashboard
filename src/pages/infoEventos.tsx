import style from "@/styles/infoEventos.module.css";
import App from "./_app";
import { FiPlusCircle } from "react-icons/fi";
import Link from 'next/link';


export default function InfoEventos() {

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
        <h1>Evento 1</h1>
        <div className={style.DivEventos}>
          <div className={style.EventoItem}>
          </div>
        </div>
        <p className={style.p}>Local: Einstein
          <br /> Data e hora: 24/05/2023
          <br /> inscritos: 250
          <br /> Local de refêrencia: Ao lado da cantina
          <br /> Descrição: O evento faz refêrencia a turma de TADS do 3° semestre e contará</p>
        <button className={style.loginFormBtn}>Gerar código</button>
      </div>
    </div >
  );
}
