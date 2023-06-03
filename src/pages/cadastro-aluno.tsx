import { Combo } from "next/font/google";
import style from "../styles/cadastro-aluno.module.css";
import { useState } from "react";

export default function CadastroUsuario() {
  const [codigo, setCodigo] = useState("");
  const [cursoId, setCursoId] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [cursos, setCursos] = useState<string[]>([
    "Tipo",
    "Curso 2",
    "curso 3",
  ]);

  const handleSubmit = async () => {
    try {
      // const response = await axios.get("http:localhost:300/cursos");
      // setCursos(response.data["data"])

      const response = await fetch("/usuarios/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        console.log("Usuário cadastrado com sucesso!");
        // Aqui você pode redirecionar o usuário para outra página, exibir uma mensagem de sucesso, etc.
      } else {
        console.log("Ocorreu um erro ao cadastrar o usuário.");
      }
    } catch (error) {
      console.log("Ocorreu um erro:", error);
    }
  };

  return (
    <div className={style.limiter}>
      <div className={style.containerLogin}>
        <div className={style.wrapLogin}>
          <div className={style.loginForm}>
            <div className={style.loginFormTitle}>
              <span className={style.entrar}>Cadastro de Aluno</span>
              <input
                className={style.wrapNome}
                type="text"
                name="nome"
                placeholder=" Digite seu Nome"
              />
              <br />
              <input
                className={style.wrapEmail}
                type="text"
                name="email"
                placeholder="Digite seu Email"
              />
              <br />
              <input
                className={style.wrapCurso}
                type="text"
                name="curso"
                placeholder="Digite seu Curso"
              />
              <br />

              <input
                className={style.wrapSenha}
                type="password"
                name="senha"
                placeholder="Digie sua senha"
              />
              <br />
              <input
                className={style.wrapConfirmaSenha}
                type="confirmPassword"
                name="confirmaSenha"
                placeholder="Confirme sua senha"
              />
              <br />

              <select name="cars" id="cars">
                {cursos.map((curso) => {
                  return <option value={curso}>{curso}</option>;
                })}
              </select>

              <div className={style.containerLoginFormBtn}>
                <button className={style.cadastrarFormBtn}>Cadastrar</button>
                <br />
                <br />
                <button className={style.cancelarBtn}>Cancelar</button>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
