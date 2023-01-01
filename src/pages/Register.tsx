import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';

const Register = () => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
               
                password
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input  type="email" className="form-control" placeholder="Name" required
                   onChange={e => setName(e.target.value)}
            />

          

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;
