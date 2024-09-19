import React from "react";
import soldado from "../../img/soldado.png";

export const CharactersCard = ({ store, actions, imageMapCharacters, handleCharacters }) => {
    return (
        <div className="row d-flex flex-nowrap overflow-auto">
            {store.personas.map((item, index) => (
                <div className="col-md-3 mb-4" key={index}>
                    <div className="card">
                        <img
                            src={imageMapCharacters[item.name]}
                            className="card-img-top"
                            alt={item.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title text-warning">{item.name}</h5>
                            <p className="text-light">Height: {item.height}</p>
                            <p className="text-light">Birth Year: {item.birth_year}</p>
                            <p className="text-light">Eye color: {item.eye_color}</p>
                            <div className="d-flex justify-content-around">
                                <button
                                    onClick={() => handleCharacters(item)}  // Usa handleCharacters aquí
                                    className="learn-more-button me-3"
                                >
                                    Learn more
                                </button>
                                <button
                                    onClick={() => actions.toggleFavorites(item.id, "people")}
                                    className={`fav-button ${actions.isFavorite(item.id, "people") ? 'active' : ''}`}
                                >
                                    <img
                                        src={soldado} 
                                        width="20"
                                        height="auto"
                                        alt="Favorite"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
