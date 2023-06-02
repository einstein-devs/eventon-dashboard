import style from "@/styles/criarEventos.module.css";
import App from "./_app";
import { FiPlusCircle } from "react-icons/fi";
import Link from 'next/link';

export default function CriarEventos() {
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
        <div className={style.Form_Pesquisa}>
          <select className={style.Input} name="teste" id="teste" placeholder="Local">
            <option value="opções">Sala 1</option>
            <option value="opções">Sala 2</option>
            <option value="opções">Sala 3</option>
          </select>
          <input className={style.Input} type="datetime-local" name="" id="" placeholder="Data e hora" />
          <input className={style.Input} type="text" name="" id="" placeholder="Descrição" />
        </div>
        <button className={style.loginFormBtn}>Cadastrar</button>
      </div>
    </div >
  );
}
