import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { imageMapCharacters, imageMapPlanets } from "../store/imagenesUrl";
import { CharactersCard } from "../component/CharactersCard";
import { PlanetsCard } from "../component/PlanetsCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleCharacters = (item) => {
        navigate('/infoPage/infoCharacters', { state: item });
    };
    const handlePlanets = (item) => {
        navigate('/infoPage/infoPlanets', { state: item });
    };
	return (
		<>
			<div className="container">
				<h1 className="text-warning mb-4">Characters</h1>
				<CharactersCard store={store} actions={actions} imageMapCharacters={imageMapCharacters} handleCharacters={handleCharacters} />
			</div>
			<div className="container">
				<h1 className="text-warning mb-4">Planets</h1>
				<PlanetsCard store={store} actions={actions} imageMapPlanets={imageMapPlanets} handlePlanets={handlePlanets} />
			</div>
		</>
	)
}