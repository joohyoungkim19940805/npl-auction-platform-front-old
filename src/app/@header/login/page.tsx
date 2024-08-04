'use client'
import { useState, useContext, SetStateAction, Dispatch} from 'react'
import { useRouter } from 'next/navigation';
import {AccountContext} from '@/components/globalContextWrapper/GlobalAccountContextWrapper';

const loginModal = () => {
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [successLogin, setSuccessLogin] = useState<boolean | null>(null);
    const { push } = useRouter();
    const {isLogin, checkIsLoginForToken, callLoginLogic} = useContext(AccountContext);
    return (
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
                        push('/');
                    }
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
    )
}

export default loginModal