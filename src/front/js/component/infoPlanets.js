import React from "react";
import { useLocation } from "react-router-dom";
import { imageMapPlanets } from "../store/imagenesUrl";

export const InfoPlanets = () => {
    const location = useLocation();
    const item = location.state;

    return (
        <div className="container mt-5 card-info-container">
            <div className="row d-flex justify-content-around align-items-center">
                <div className="col-md-6">
                    <img src={imageMapPlanets[item.name]} className="img-fluid img-thumbnail" />
                </div>
                <div className="col-md-6">
                    <h1>{item.name}</h1>
                    <p className="fs-4">{item.description}
                        <br></br>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
            </div>
            <div style={{ height: '5px' }} className="border m-5 bg-warning"></div>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-2">
                <h5 className="text-warning">Name:</h5>
                    <p>{item.name}</p>
                </div>
                <div className="col-md-2">
                <h5 className="text-warning">Climate:</h5>
                    <p>{item.climate}</p>
                </div>
                <div className="col-md-2">
                <h5 className="text-warning">Diameter:</h5>
                    <p>{item.diameter}</p>
                </div>
                <div className="col-md-2">
                <h5 className="text-warning">Population:</h5>
                    <p>{item.population}</p>
                </div>
            </div>
        </div>
    );
}