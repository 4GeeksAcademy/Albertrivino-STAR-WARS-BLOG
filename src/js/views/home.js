import React, { useContext, useEffect } from "react";
import Card from "./card";
import { Context } from "../store/appContext";
import LogoStarWars from "../../img/Logo2.png";
import "../../styles/index.css";

const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.people.length === 0) actions.getPeople();
        if (store.planets.length === 0) actions.getPlanets();
        if (store.starships.length === 0) actions.getStarships();
    }, []);

    const renderItems = (items, type) => {
        return items.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-2 mb-3">
                <Card name={item.name} uid={item.uid} type={type} />
            </div>
        ));
    };

    return (
        <div>
            <div className="logo">
                <img src={LogoStarWars} className="card-img-top" alt="Logo Star Wars" />
            </div>

            <div className="text-start text-warning">
                <h1>Characters</h1>
            </div>
            <div className="horizontal-scroll-container">
                <div className="d-flex">
                    {renderItems(store.people, "characters")}
                </div>
            </div>

            <div className="text-start text-warning mt-5">
                <h1>Planets</h1>
            </div>
            <div className="horizontal-scroll-container">
                <div className="d-flex">
                    {renderItems(store.planets, "planets")}
                </div>
            </div>

            <div className="text-start text-warning mt-5">
                <h1>Starships</h1>
            </div>
            <div className="horizontal-scroll-container">
                <div className="d-flex">
                    {renderItems(store.starships, "starships")}
                </div>
            </div>
        </div>
    );
};

export default Home;
