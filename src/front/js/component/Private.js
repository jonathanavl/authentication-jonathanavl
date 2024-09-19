import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const withSession = !!store?.isLoggedIn;

    useEffect(() => {
        if (!withSession) {
            navigate("/login");
        }
    }, [withSession, navigate]);

    if (!store.favorites || !Array.isArray(store.favorites) || store.favorites.length === 0) {
        return <div className="text-center"><h1 className="font-monospace">No favorites available.</h1></div>;
    }
    const handleCharacters = (item) => {
        navigate('/infoPage/infoCharacters', { state: item });
    };
    const handlePlanets = (item) => {
        navigate('/infoPage/infoPlanets', { state: item });
    };

    const people = store.favorites.filter(item => item.type === 'people');
    const planets = store.favorites.filter(item => item.type === 'planet');

    return (
        <div className="favorites-container">
            <h2>Favorites</h2>
            <hr className="white-line" />
            {people.length > 0 && (
                <div className="mb-4">
                    <h4>Characters</h4>
                    <ul className="list-group">
                        {people.map((item, index) => (
                            <li className="favorites-item" key={index}>
                                <span onClick={() => handleCharacters(item)}>{item.name}</span>
                                <div>
                                    <button onClick={() => actions.toggleFavorites(item.id, item.type)}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {planets.length > 0 && (
                <div>
                    <h4>Planets</h4>
                    <ul className="list-group">
                        {planets.map((item, index) => (
                            <li className="favorites-item" key={index}>
                                <span onClick={() => handlePlanets(item)}>{item.name}</span>
                                <div>

                                    <button
                                        onClick={() => actions.toggleFavorites(item.id, item.type)}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};