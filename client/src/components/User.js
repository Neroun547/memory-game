import React, { useEffect, useState } from 'react'
import "../style/user-info.css";
export const User = () => {
    const [active, setActive] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch('/user', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token:localStorage.getItem('token')
            })
        })
        .then((data) => {
            setError('');
            if(data.ok){
                return data.json();
            } else {
                setError('Server error...');
            }
        })
        .then((data) => {
            console.log(data);
            setUser({name:data.name, email:data.email});
        })
        .catch(() => {
            setError("Server error...");
        })
    }, []);

    const exitAccount = () => {
        setActive(false);
        localStorage.clear();
        window.location.reload();
    }
    if(!active) {
        return (
            <div>
                You don't enter your account ....
            </div>
        )
    } else if(error) {
        return (
            <div>
                {error}
            </div>
        )
    } else if(user){
        return (
            <>
                <div className="wrapper-user-info">
                    <div>Name: {user.name}</div>
                    <div>Email: {user.email}</div>
                    <button onClick={exitAccount}>Exit account</button>
                </div>
                <div className="text-info">
                    It's page settings your account -_-
                </div>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}
