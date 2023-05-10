import style from "../styles/styles.module.css"

export default function telaLogin() {
    return(
    <div className={style.limiter}>
        <div className={style.containerLogin}>
            <div className={style.wrapLogin}>
                <div className={style.loginMore}>
                    <div className={style.loginForm}>
                        <div className={style.loginFormTitle}>
                            <input className="" type="text" name="ra"/>
                            <br />
                            <input className="" type="password" name="senha"/>
                            <br />
                            <button>entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )   
    
}