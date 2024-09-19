import React from "react";
import soldado from "../../img/soldado.png";

export const PlanetsCard = ({ store, actions, imageMapPlanets, handlePlanets }) => {
    return (
        <div className="row d-flex flex-nowrap overflow-auto">
            {store.planetas.map((item, index) => (
                <div className="col-md-3 mb-4" key={index}>
                    <div className="card">
                        <img
                            src={imageMapPlanets[item.name]}
                            className="card-img-top"
                            alt={item.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title text-warning">{item.name}</h5>
                            <p className="text-light">Population: {item.population}</p>
                            <p className="text-light">Climate: {item.climate}</p>
                            <div className="d-flex justify-content-around">
                                <button
                                    onClick={() => handlePlanets(item)} 
                                    className="learn-more-button me-3"
                                >
                                    Learn more
                                </button>
                                <button
                                    onClick={() => actions.toggleFavorites(item.id, "planet")}
                                    className={`fav-button ${actions.isFavorite(item.id, "planet") ? 'active' : ''}`}
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
