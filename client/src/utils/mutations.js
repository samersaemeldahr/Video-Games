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
          id
          name
          background_image
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
        id
        name
        background_image
        released
        rating
        metacritic
      }
    }
  }
`;

// REMOVE_GAME
export const REMOVE_GAME = gql`
  mutation removeGame($id: String!) {
    removeGame(id: $id) {
      _id
      username
      email
      gameCount
      savedGames {
        id
        name
        background_image
        released
        rating
        metacritic
      }
    }
  }
`