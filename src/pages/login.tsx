import style from "../styles/login.module.css"
import Link from 'next/link';

export default function telaLogin() {
    return (
        <div className={style.limiter}>
            <div className={style.containerLogin}>
                <div className={style.wrapLogin}>
                    <div className={style.loginForm}>
                        <div className={style.loginFormTitle}>
                            <span className={style.entrar} >Entrar</span>
                            <input className={style.wrapRa} type="text" name="ra" placeholder="Digite seu RA" />
                            <br />
                            <input className={style.wrapSenha} type="password" name="senha" placeholder="Digie sua senha" />
                            <br />
                            <div className={style.containerLoginFormBtn}>
                                <Link href="/eventos" className={style.loginFormBtn}>Acessar</Link>
                                <br />
                                <Link href="esqueci-senha" className={style.esqueceuSenha}>Esqueceu sua senha?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}