import '../style/signin.css';
import { useState } from 'react';
export const Signin = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState('');
    const changeEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const changePassword = (e) => {
        setInputPassword(e.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/signin', {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:inputEmail,
                    password:inputPassword
                })
            })
            if(res.ok){
                const data = await res.json();
                localStorage.setItem('token', data.token);
                window.location.reload();
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch(e){
            setError("Server error");
        }
    };
    if(!error){
        return (
            <>
                <form onSubmit={submit} action="/signin" method="POST" className="sign-form">
                    <input type="text" placeholder="Email" name="email" onChange={changeEmail}
                    value={inputEmail} />
                    <input type="password" placeholder="Password" name="password"
                    onChange={changePassword} value={inputPassword} />
                    <button type="submit">Submit</button>
                </form>
            </>
        )   
    } else {
        return (
            <>
                <form onSubmit={submit} action="/signin" method="POST" className="sign-form">
                    <input type="text" placeholder="Email" name="email" onChange={changeEmail}
                    value={inputEmail} />
                    <input type="password" placeholder="Password" name="password"
                    onChange={changePassword} value={inputPassword} />
                    <button type="submit">Submit</button>
                </form>
                <div className="alert-signup">{error}</div>
            </>
        )      
    }
};