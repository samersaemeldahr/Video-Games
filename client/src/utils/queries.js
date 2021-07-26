import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            gameCount
            savedGames {
                gameId
                name
                background_image
                released
                rating
                metacritic
            }
        }
    }
`;