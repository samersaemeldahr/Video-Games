import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_GAME } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const SavedGames = () => {
  const [removeGame, { error }] = useMutation(REMOVE_GAME);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const handleDeleteGame = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeGame({
        variables: { id },
      });

      console.log(data);

      if (error) {
        throw new Error('Something went wrong!');
      }

      // Remove game ID from localStorage
      removeGameId(id);
    } catch (err) {
      console.error(err);
    }
  };

  // Loading until we recieve data
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved games!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <CardColumns>
          {userData.savedGames.map((game) => {
            return (
              <Card key={game.id} border='dark'>
                {game.background_image ? <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <p className='small'>Rating: {game.rating}</p>
                  <p className='small'>Metacritic: {game.metacritic}</p>
                  <p className='small'>Released: {game.released}</p>
                  <Card.Text>{game.rating}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.id)}>
                    Delete this Game!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedGames;
