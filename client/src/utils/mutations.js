import { gql } from '@apollo/client';

// LOGIN_USER
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        gameCount
        savedGames {
          gameId
          name
          background-image
          released
          rating
          metacritic
        }
      }
    }
  }
`;

// ADD_USER
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// SAVE_GAME
export const SAVE_GAME = gql`
  mutation saveGame($input: gameInput!) {
    saveGame(input: $input) {
      _id
      username
      email
      savedGames {
        gameId
        name
        background-image
        released
        rating
        metacritic
      }
    }
  }
`;

// REMOVE_GAME
export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId) {
      _id
      username
      email
      gameCount
      savedGames {
        gameId
        name
        background-image
        released
        rating
        metacritic
      }
    }
  }
`