import React from "react";

var pokemonList = (props) => {
  return (
    <div>
      <h3>{props.props.name}</h3>
      <img src={props.props.img} />
    </div>
  )
}

export default pokemonList;