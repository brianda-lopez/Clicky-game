import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import CharacterTile from "./components/Charactertile";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import Grid, { Container, Col, Row } from "./components/Grid";
import Footer from "./components/Footer";
import characters from "./characters.json";

/*
STEPS FOR THE GAME TO FUNCTION:
1. Random presentation of all characters
2. Each tile can be "clicked" as true or false, but each character starts each new round as "clicked" === false
3. Each time a tile is clicked (and goes from false to true), then add to a "top score" counter
4. If a clicked === true tile gets clicked again, then end the game and restart the round
  a. Compare the latest score to the last score. If the latest score is higher, then store it as the "Top Score". If the latest score is lower, then do nothing.
*/

function shuffleCharacters (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// establishes beginning state of game
class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      characters,
      currentScore: 0,
      topScore: 0,
      winlossmessage: "",
      clicked: []
    }
  }

  handleClick = (id) => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleCalculate();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };
  handleCalculate = () => {
    const newScore = this.state.currentScore + 1;
    this.setState ({
      currentScore: newScore,
      winlossmessage: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ winlossmessage: "You win!"});
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      winlossmessage: "Try again!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledCharacters = shuffleCharacters(characters);
    this.setState({ characters: shuffledCharacters });
  };

  // shows the elements on the page
  render() {
    return (
      <div className="App">

        <Navbar
          currentScore={this.state.currentScore}
          topScore={this.state.topScore}
          winlossmessage={this.state.winlossmessage}
        />
        
        <Jumbotron />

        <Container fluid>

          <Row>
            {this.state.characters.map(character => (
              <CharacterTile 
                image={character.image}
                key={character.id}
                id={character.id}
                name={character.name}
                onClick={this.handleClick}
              />
            ))}
          </Row>

        </Container>

        <Footer />
      </div>
    );
  }
}

export default App;