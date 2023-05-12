import style from "../styles/login.module.css"

export default function telaLogin() {
    return(
    <div className={style.limiter}>
        <div className={style.containerLogin}>
            <div className={style.wrapLogin}>
                    <div className={style.loginForm}>
                        <div className={style.loginFormTitle}>
                            <span className={style.entrar} >Entrar</span>
                            <input className={style.wrapRa} type="text" name="ra" placeholder="Digite seu RA"/>
                            <br />
                            <input className={style.wrapSenha} type="password" name="senha" placeholder="Digie sua senha"/>
                            <br />
                            <div className={style.containerLoginFormBtn}>
                            <button className={style.loginFormBtn}>Acessar</button>
                            <br />
                            <a href="" className={style.esqueceuSenha}>Esqueceu sua senha?</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )   
    
}