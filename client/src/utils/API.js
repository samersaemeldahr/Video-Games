// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save game data for a logged in user
export const saveGame = (gameData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gameData),
  });
};

// remove saved book data for a logged in user
export const deleteGame = (gameId, token) => {
  return fetch(`/api/users/games/${gameId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// Search games on RAWG API
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchRawgGames = (query) => {
  // return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`); adding rawg request
  return fetch(`https://api.rawg.io/api/games?key=e22d7495b6e843b293ff4b81ad8574ae&search=${query}`)
};
