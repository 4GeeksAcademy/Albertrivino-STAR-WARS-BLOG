import React from 'react';
import { useParams } from 'react-router';
import { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Details = () => {
    const { uid, type } = useParams();
    const { store, actions } = useContext(Context);
    const baseURL = `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;

    useEffect(() => {
        if (type === 'planets') {
            actions.getInfoPlanets(uid);
        } else if (type === 'characters') {
            actions.getInfoPeople(uid);
        } else if (type === 'starships') {
            actions.getInfoStarships(uid);
        }
    }, []);

    const renderContent = () => {
        let details = {};
        let description = "";

        if (type === 'planets') {
            description = store.infoPlanets.description;
            details = store.infoPlanets?.properties;
        } else if (type === 'characters') {
            description = store.infoPeople?.description;
            details = store.infoPeople?.properties;
        } else if (type === 'starships') {
            description = store.infoStarships?.description;
            details = store.infoStarships?.properties;
        }

        return details ? (
            <div className='text-white'>
                <h2>{details.name}</h2>
                <p>{description}</p>
                <ul className="list-unstyled">
                    {Object.entries(details).map(([key, value], index) => (
                        <li key={index}><strong>{key}:</strong> {value}</li>
                    ))}
                </ul>
            </div>
        ) : <p className='text-white'>Loading...</p>;
    };

    return (
        <div className="container-fluid text-light">
            <div className="row mt-2">
                <div className="col-12 col-md-6">
                    <img src={baseURL} alt={`${type} ${uid}`} className="img-fluid" />
                </div>
                <div className="col-12 col-md-6 text-start">
                    {renderContent()}
                    <div className="mt-3 text-start">
                        <Link to="/" className="btn btn-warning">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
