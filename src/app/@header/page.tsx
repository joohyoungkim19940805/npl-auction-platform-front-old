'use client'
import styles from '@/app/@header/page.module.css'
import flexLayoutStyles from '@styles/flexLayout.module.css'
import { useContext, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link'
import { AccountContext } from '@/components/globalContextWrapper/GlobalAccountContextWrapper'

const Header = () => {

  const {isLogin, checkIsLoginForToken, callLogoutLogic, callLoginLogic} = useContext(AccountContext);
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState<boolean | null>(null);
  const { push } = useRouter();

  return (
    <div id={styles.header_wrapper}>
      <div>header array</div>
      <div>
        {! isLogin ? 
        <button onClick={(e) => setIsLoginClick(!isLoginClick)}>
          Login~
          {/*<Link href={`/login?back_page=${usePathname()}`}>Login~</Link> -->*/}
        </button>
        : 
        <button type='button' onClick={() => {
          callLogoutLogic();
        }}>
        logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </button>
        }
      </div>
      { ! isLoginClick ? 
        <></>
        :
        <div style={{
          position: 'fixed',
          backgroundColor: '#99999978',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '9999'
        }}>
          <div style={{
              backgroundColor: '#fbfbfbd9',
              padding: '16%',
              borderRadius: '17px'
          }}>
              <div>
                  <h1>Login</h1>
              </div>
              <form id='header_login_form' onSubmit={(e)=>{
                  e.preventDefault();
                  let result = callLoginLogic(accountId, password)
                  setSuccessLogin(result);
                  if(result){
                      //push('/'); / 메인 으로 이동
                      setIsLoginClick(false);
                  }
                  setAccountId('');
                  setPassword('');
              }}>
                  <input type='text' onInput={(e)=>setAccountId((e.target as HTMLInputElement).value)}></input>
                  <input type='password' onInput={(e)=>setPassword((e.target as HTMLInputElement).value)}></input>
                  <button type='submit'
                      disabled={ ! (accountId.length > 0 && password.length > 0)}>login button
                  </button>
              </form>
              {successLogin == false && 
                  <div>
                      <h2>fila login!</h2>
                  </div>
              }
              <div>

              </div>
          </div>
        </div>
      }
    </div>
  )
}
export default Header;