import style from "@/styles/dashboard.module.css";
import App from "./_app";
import { FiPlusCircle } from "react-icons/fi";

export default function Dashboard() {
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
            placeholder=" Pesquise por nome do aluno"
            className={style.Input}
          />
          <div className={style.DivIcon}>
            <a href="#">
              <FiPlusCircle className={style.FiPlusCircle} />
            </a>
          </div>
        </form>

        <div>
          <table className={style.table}>
            <thead className={style.THEAD}>
              <tr className={style.TR}>
                <th className={style.TH}>Nome</th>
                <th className={style.TH}>RA</th>
                <th className={style.TH}>Curso</th>
              </tr>
            </thead>
            <tbody className={style.TBODY}>
              <tr className={style.TR}>
                <td className={style.TD}>João</td>
                <td className={style.TD}>123456</td>
                <td className={style.TD}>Engenharia</td>
              </tr>

              <tr className={style.TR}>
                <td className={style.TD}>Maria</td>
                <td className={style.TD}>789012</td>
                <td className={style.TD}>Medicina</td>
              </tr>

              <tr className={style.TR}>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
              </tr>

              <tr className={style.TR}>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
              </tr>
              <tr className={style.TR}>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
              </tr>
              <tr className={style.TR}>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
                <td className={style.TD}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
