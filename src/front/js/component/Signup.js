import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleSignup = async (e) => {
    e.preventDefault();
    // Llamamos a la función createUser del contexto global
    const user = await actions.createUser(email, password);
    if (user) {
        console.log("Usuario creado con éxito");

        // Iniciar sesión automáticamente
        const loggedIn = await actions.login(email, password);
        if (loggedIn) {
            console.log("Inicio de sesión exitoso");
            navigate('/'); // Redirigimos a la página de inicio o a la página deseada
        } else {
            console.log("Fallo al iniciar sesión");
        }
    } else {
        console.log("Fallo al crear el usuario");
    }
};

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
             <div className="card text-light" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '2px solid #333' }}>
                <div className="card-body">
                    <div className="card-title text-center">
                        <h3 className="text-warning" style={{ fontSize: '2rem', letterSpacing: '2px' }}>Signup</h3>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label text-warning" style={{ fontSize: '1.1rem' }}>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '6px' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label text-warning" style={{ fontSize: '1.1rem' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '6px' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-warning w-100" style={{ fontSize: '1.1rem', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};