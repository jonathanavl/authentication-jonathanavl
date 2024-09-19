const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			token: "",
			currentUser: null,
			isLoggedIn: false,
			users: [],
			personas: [],
			planetas: [],
			favorites: []
		},
		actions: {
			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Login failed:", errorData.message);
						return false;
					}

					const data = await response.json();
					const accessToken = data.access_token;
					if (accessToken) {
						localStorage.setItem("accessToken", accessToken);
						await getActions().getCurrentUser();
						return true;
					}
					return false;
				} catch (error) {
					console.error("Error al logear (flux.js):", error);
					return false;
				}
			},

			getCurrentUser: async () => {
				try {
					const accessToken = localStorage.getItem("accessToken");
					if (!accessToken) throw new Error("Token no disponible");

					const response = await fetch(`${process.env.BACKEND_URL}/api/current-user`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) throw new Error("No se pudo obtener el usuario");

					const data = await response.json();
					const currentUser = data.current_user;
					setStore({ currentUser, isLoggedIn: true });
				} catch (error) {
					console.error("Error al obtener el usuario:", error);
					localStorage.removeItem("accessToken");
					setStore({ currentUser: null, isLoggedIn: false });
				}
			},

			createUser: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al crear usuario:", errorData.message);
						return false;
					}

					const data = await response.json();
					console.log("Usuario creado:", data);
					return true;
				} catch (error) {
					console.error("Error al crear usuario:", error);
					return false;
				}
			},

			logout: () => {
				localStorage.removeItem("accessToken");
				setStore({ currentUser: null, isLoggedIn: false });
			},

			getCharacters: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/people`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) throw new Error("Error fetching characters");

					const data = await response.json();
					setStore({ personas: data });
				} catch (error) {
					console.error("Error fetching characters:", error);
				}
			},

			getCharactersInfo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/people/${id}`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) throw new Error("Error fetching character info");

					const data = await response.json();
					return data.result;
				} catch (error) {
					console.error("Error fetching character info:", error);
				}
			},

			getPlanets: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/planets`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) throw new Error("Error fetching planets");

					const data = await response.json();
					setStore({ planetas: data });
				} catch (error) {
					console.error("Error fetching planets:", error);
				}
			},

			getPlanetsInfo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/planets/${id}`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) throw new Error("Error fetching planet info");

					const data = await response.json();
					return data.result;
				} catch (error) {
					console.error("Error fetching planet info:", error);
				}
			},

			toggleFavorites: async (id, type) => {
				try {
					const accessToken = localStorage.getItem("accessToken");
					if (!accessToken) throw new Error("Usuario no autenticado");
			
					const store = getStore();
					const favorites = Array.isArray(store.favorites) ? store.favorites : [];
					const isFavorite = favorites.some(fav => fav.id === id && fav.type === type);
					const options = {
						method: isFavorite ? "DELETE" : "POST",
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json"
						}
					};
					const url = `${process.env.BACKEND_URL}/api/favorite/${type}/${id}`;
					const response = await fetch(url, options);
			
					if (!response.ok) throw new Error("Error al actualizar favoritos");
			
					await getActions().getUserFavorites();
				} catch (error) {
					console.error("Error en la solicitud de favoritos:", error);
				}
			},

			getUserFavorites: async () => {
				const accessToken = localStorage.getItem("accessToken");
				if (!accessToken) {
					console.error("User is not authenticated");
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/favorites`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`
						}
					});
			
					if (!response.ok) throw new Error("Error fetching user favorites");
			
					const data = await response.json();
					const favorites = [
						...data.favorite_planets.map(planet => ({ id: planet.id, name: planet.name, type: "planet" })),
						...data.favorite_people.map(person => ({ id: person.id, name: person.name, type: "people" }))
					];
			
					setStore({ favorites: Array.isArray(favorites) ? favorites : [] });
				} catch (error) {
					console.error("Error fetching user favorites:", error);
				}
			},

			removeFavorites: (id) => {
				const store = getStore();
				setStore({ favorites: store.favorites.filter(element => element.id !== id) });
			},

			isFavorite: (id, type) => {
				const store = getStore();
				const favorites = Array.isArray(store.favorites) ? store.favorites : [];
				return favorites.some(favorite => favorite.id === id && favorite.type === type);
			},
		}
	};
};

export default getState;