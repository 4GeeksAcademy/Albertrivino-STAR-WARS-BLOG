import React from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import { useContext } from 'react'

const Card = ({ name, uid, type }) => {
  const { store, actions } = useContext(Context);
  const baseURL = `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`

  const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === type);

  const handleFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(uid, type);
    } else {
      actions.addFavorite({ name, uid, type });
    }
  };

  return (
    <div className='col-12 mb-4 card-container'>
      <div className="card bg-black text-warning" style={{ width: "18rem" }}>
        <img src={baseURL} onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <Link to={`/details/${type}/${uid}`} >
            <button type="button" className="btn btn-outline-light mx-3">Learn more!</button>
          </Link>
          <button type="button" className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`} onClick={handleFavorite}>
            <i className={`fa-solid fa-heart ${isFavorite ? 'text-white' : ''}`}></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
