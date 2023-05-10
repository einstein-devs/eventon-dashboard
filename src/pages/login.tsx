import style from "../styles/styles.module.css"

export default function telaLogin() {
    return(
    <div className={style.limiter}>
        <div className={style.containerLogin}>
            <div className={style.wrapLogin}>
                    <div className={style.loginForm}>
                        <div className={style.loginFormTitle}>
                            <input className={style.wrapInput} type="text" name="ra" placeholder="Login"/>
                            <br />
                            <input className={style.wrapInput} type="password" name="senha" placeholder="Senha"/>

                            <br />
                            <div className={style.containerLoginFormBtn}>
                            <button className={style.loginFormBtn}>entrar</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )   
    
}