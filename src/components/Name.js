import React, { useEffect } from 'react';
import api from '../api';
import ReadyPlayers from './ReadyPlayers';
import Turn from './Turn';

function Name(props) {
  useEffect(() =>  {
    let readySource = api.ready(props.game._id)
    readySource.onmessage = e => props.setPlayers(JSON.parse(e.data))
    readySource.onerror = e => console.log(e)
  });

  const submitPlayerName = (name) => {
    let modifiedPlayer = props.player
    modifiedPlayer.name = name
    api
      .name({_id: props.game._id, player: modifiedPlayer})
      .then(result => {
        modifiedPlayer.ready = true
        props.modifyPlayer(modifiedPlayer)})
      .catch(err => console.log(err));
  }



  return (

    <div>
      <Turn target="name"
            label="Put Your Game Name On:"
            buttonText="Let's Play!"
            placeholder="Your Name..."
            player={props.player}
            submitPlayerName={submitPlayerName}
            />
      <ReadyPlayers players={props.game.players} />
    </div>
  );
};

export default Name;
