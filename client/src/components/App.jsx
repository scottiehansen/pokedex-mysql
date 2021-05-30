import React from 'react';
import axios from "axios";
import Pokemon from "./Pokemon.jsx";
import Types from "./Types.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'everything',
      typeList: [],
      pokemonList: [],
      pokemonByType: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/route/getPokemon')
    .then(responseOne => {
      axios.get('route/getTypes')
      .then(responseTwo => {
        var types = [{type: 'everything'}, ...responseTwo.data];
        this.setState({
          pokemonList: responseOne.data
        })
        this.setState({
          typeList: types
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleChange(event) {
    event.preventDefault();
    var typePokemon = [];
    for (var i =0; i < this.state.pokemonList.length; i++) {
      if (this.state.pokemonList[i].type === event.target.value) {
        typePokemon.push(this.state.pokemonList[i])
      }
    }
    this.setState({
      type: event.target.value,
      pokemonByType: typePokemon
    })
  }

  render() {
    if (this.state.type === 'everything') {
      return (
        <div>
          <h1>Fullstack Pokedex!</h1>
          <button>Show All</button>
          <select value={this.state.type} onChange={this.handleChange}>
            {this.state.typeList.map((type, index) => (
              <Types types={type} key={index} />
            ))}
            {/* <option value= "everything">Sort by Type</option>
            <option value = "Grass">Grass</option>
            <option value = "Fire">Fire</option>
            <option value = "Water">Water</option>
            <option value = "Bug">Bug</option>
            <option value = "Normal">Normal</option>
            <option value = "Poison">Poison</option>
            <option value = "Electric">Electric</option>
            <option value = "Ground">Ground</option>
            <option value = "Fighting">Fighting</option>
            <option value = "Psychic">Psychic</option>
            <option value = "Rock">Rock</option>
            <option value = "Ghost">Ghost</option>
            <option value = "Ice">Ice</option>
            <option value = "Dragon">Dragon</option>
            <option value = "Fighting">Fighting</option> */}
          </select>
          <div>
            {this.state.pokemonList.map((pokemon, index) => (
              <Pokemon props={pokemon} key={index} />
            ))}
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Fullstack Pokedex!</h1>
            <button>Show All</button>
            <select value={this.state.type} onChange={this.handleChange} id="types">
            {this.state.typeList.map((type, index) => (
              <Types types={type} key={index} />
            ))}
              {/* <option value= "everything">Sort by Type</option>
              <option value = "Grass">Grass</option>
              <option value = "Fire">Fire</option>
              <option value = "Water">Water</option>
              <option value = "Bug">Bug</option>
              <option value = "Normal">Normal</option>
              <option value = "Poison">Poison</option>
              <option value = "Electric">Electric</option>
              <option value = "Ground">Ground</option>
              <option value = "Fighting">Fighting</option>
              <option value = "Psychic">Psychic</option>
              <option value = "Rock">Rock</option>
              <option value = "Ghost">Ghost</option>
              <option value = "Ice">Ice</option>
              <option value = "Dragon">Dragon</option>
              <option value = "Fighting">Fighting</option> */}
          </select>
            <div>
            {this.state.pokemonByType.map((pokemon, index) => (
              <Pokemon props={pokemon} key={index} />
            ))}
          </div>
        </div>
      )
    }
  }
}


export default App;