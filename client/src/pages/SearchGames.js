import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Logo from '../assets/icons8-joystick-96.png';

import Auth from '../utils/auth';
import { searchRawgGames } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

const SearchGames = () => {
  // holding returned rawg api data
  const [searchedGames, setSearchedGames] = useState([]);

  // holding search field data
  const [searchInput, setSearchInput] = useState('');

  // holding saved gameId values
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame, { error }] = useMutation(SAVE_GAME);

  // Set up useEffect hook
  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRawgGames(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();

      const gameData = results.map((game) => ({
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        metacritic: game.metacritic
      }));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // save a game to database
  const handleSaveGame = async (id) => {

    // find the game in `searchedGames` state by the matching id
    const gameToSave = searchedGames.find((game) => game.id === id);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveGame({
        variables: { input: gameToSave }
      });

      console.log(data);

      if (error) {
        throw new Error('Something went wrong!');
      }

      // save game id to state if game successfully saves to user's account
      setSavedGameIds([...savedGameIds, gameToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-dark bg-warning' style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
        <Container className='text-center'>
          <h1>Video Game Search</h1>
          <Form className='text-dark' onSubmit={handleFormSubmit}>
            <Form.Row className="mb-3 justify-content-md-center">
              <Col xs lg="6">
                <h3 className="mb-3">All titles, all platforms, your bucket list!</h3>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  placeholder='Search for a game'
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Button type='submit' variant='dark'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className='text-center bg-warning' style={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
        <h4 className='p-3'>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : '- Your search results will show up here -'}
        </h4>
        <CardColumns>
          {searchedGames.map((game) => {
            return (
              <Card key={game.id} border='dark'>
                {game.background_image ? (
                  <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title className='bg-dark text-light p-3'>{game.name}</Card.Title>
                  <Card.Text>Released: {game.released} id: {game.id}</Card.Text>
                  <Card.Text>Rating: {game.rating}</Card.Text>
                  <Card.Text>Metacritic: {game.metacritic ? game.metacritic : 'N/A'}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedGameId) => savedGameId === game.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame(game.id)}>
                      {savedGameIds?.some((savedGameId) => savedGameId === game.id)
                        ? 'This game has already been saved!'
                        : 'Save this game!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};


export default SearchGames;