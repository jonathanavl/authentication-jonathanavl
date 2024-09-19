import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const logged = await actions.login(email, password);
        if (logged) {
            navigate("/");
        }
        setEmail("");
        setPassword("");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card text-light" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '2px solid #333' }}>
            <div className="card-body">
                <h3 className="card-title text-warning text-center" style={{ fontSize: '2rem', letterSpacing: '2px' }}>Login</h3>
                <form onSubmit={handleLogin}>
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
