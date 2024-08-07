const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: JSON.parse(localStorage.getItem("people")) || [],
			planets: JSON.parse(localStorage.getItem("planets")) || [],
			starships: JSON.parse(localStorage.getItem("starships")) || [],
			infoPeople: JSON.parse(localStorage.getItem("infoPeople")) || [],
			infoPlanets: JSON.parse(localStorage.getItem("infoPlanets")) || [],
			infoStarships: JSON.parse(localStorage.getItem("infoStarships")) || [],
			favorites: JSON.parse(localStorage.getItem("favorites")) || [],
		},
		actions: {
			saveToLocalStorage: (key, value) => {
				localStorage.setItem(key, JSON.stringify(value));
			},
			getPeople: () => {
				const store = getStore();
				if (store.people.length === 0) {
					fetch("https://www.swapi.tech/api/people")
						.then(res => res.json())
						.then(data => {
							setStore({ people: data.results });
							getActions().saveToLocalStorage("people", data.results);
						})
						.catch(err => console.error(err));
				}
			},
			getPlanets: () => {
				const store = getStore();
				if (store.planets.length === 0) {
					fetch("https://www.swapi.tech/api/planets")
						.then(res => res.json())
						.then(data => {
							setStore({ planets: data.results });
							getActions().saveToLocalStorage("planets", data.results);
						})
						.catch(err => console.error(err));
				}
			},
			getStarships: () => {
				const store = getStore();
				if (store.starships.length === 0) {
					fetch("https://www.swapi.tech/api/starships")
						.then(res => res.json())
						.then(data => {
							setStore({ starships: data.results });
							getActions().saveToLocalStorage("starships", data.results);
						})
						.catch(err => console.error(err));
				}
			},
			getInfoPeople: (id) => {
				fetch(`https://www.swapi.tech/api/people/${id}`)
					.then(res => res.json())
					.then(data => setStore({ infoPeople: data.result }))
					.catch(err => console.error(err));
			},
			getInfoPlanets: (id) => {
				fetch(`https://www.swapi.tech/api/planets/${id}`)
					.then(res => res.json())
					.then(data => setStore({ infoPlanets: data.result }))
					.catch(err => console.error(err));
			},
			getInfoStarships: (id) => {
				fetch(`https://www.swapi.tech/api/starships/${id}`)
					.then(res => res.json())
					.then(data => setStore({ infoStarships: data.result }))
					.catch(err => console.error(err));
			},
			addFavorite: (item) => {
				if (item && item.uid && item.type && item.name) {
					const store = getStore();
					const updatedFavorites = [...store.favorites, item];
					setStore({ favorites: updatedFavorites });
					getActions().saveToLocalStorage("favorites", updatedFavorites);
				}
			},
			removeFavorite: (uid) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter(fav => fav && fav.uid !== uid);
				setStore({ favorites: updatedFavorites });
				getActions().saveToLocalStorage("favorites", updatedFavorites);
			},
		}
	};
};

export default getState;
