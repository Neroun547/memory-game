import '../style/signin.css';
import { useState } from 'react';
export const Signup = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const changeName = (e) => {
        setNameInput(e.target.value);
    }

    const changeEmail = (e) => {
        setEmailInput(e.target.value);
    }

    const changePassword = (e) => {
        setPasswordInput(e.target.value);
    }

    const submit = (e) => {
        setError('');
        setMsg('');
        setNameInput('');
        setEmailInput('');
        setPasswordInput('');

        e.preventDefault();
        fetch('/signup', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:nameInput,
                email:emailInput,
                password:passwordInput
            })
        })
        .then(data => {
            if(!data.ok){
                return data.json();
            } else {
                setMsg("Letter send in your email");
            }
        })
        .then((response) => {
            if(response){
                setError(response.message);
            }
        })
        .catch(() => {
            setError("Error");
        })
    }
    if(!error && !msg){
        return (
            <>
                <form method="POST" className="sign-form" onSubmit={submit}>
                    <input type="text" placeholder="Name" name="name" onChange={changeName} value={nameInput}/>
                    <input type="text" placeholder="Email" name="email" onChange={changeEmail} value={emailInput}/>
                    <input type="password" placeholder="Password" onChange={changePassword} name="password" value={passwordInput}/>
                    <button type="submit">Submit</button>
                </form>
            </>
        )
    } else if(error){
        return (
            <>
            <form method="POST" className="sign-form" onSubmit={submit}>
                <input type="text" placeholder="Name" name="name" onChange={changeName} value={nameInput}/>
                <input type="text" placeholder="Email" name="email" onChange={changeEmail} value={emailInput}/>
                <input type="password" placeholder="Password" onChange={changePassword} name="password" value={passwordInput}/>
                <button type="submit">Submit</button>
            </form>
            <div className="alert-signup">{error}</div>
        </>
        )
    } else if(msg){
        return (
            <>
            <form method="POST" className="sign-form" onSubmit={submit}>
                <input type="text" placeholder="Name" name="name" onChange={changeName} value={nameInput}/>
                <input type="text" placeholder="Email" name="email" onChange={changeEmail} value={emailInput}/>
                <input type="password" placeholder="Password" onChange={changePassword} name="password" value={passwordInput}/>
                <button type="submit">Submit</button>
            </form>
            <div className="alert-signup">{msg}</div>
            </>
        )
    } else {
        return <div>Loading...</div>
    }
};