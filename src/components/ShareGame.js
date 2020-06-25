import React, { useState } from 'react';

function ShareGame(props){
  const [shareGame, setShareGame] = useState(true);

  let linkList;
  let buttonText;
  const linkBase = "?id=" + props.game._id + "&player=";


  if (shareGame) {
    buttonText = "Hide Sharing";
    linkList = props.game.players.map(function(player, index) {
      let linkUrl = linkBase + player.slug;
      if (index !== 0) {
        return <li key={index}>Shared Link: <a href={linkUrl}>{linkUrl}</a></li>
      } else {  
        let adminUrl = linkUrl + "&admin=" + props.game.admin;
        return <li key={index}>Your Link: <a href={adminUrl}>{adminUrl}</a></li>
      }
    });
  } else {
    buttonText = "Enable Sharing"
    linkList = ""
  }
  

  return (
    <div className="shareGame">
      <div>
        <ul className="readyPlayers">
          {linkList}
        </ul>
       <button onClick={() => setShareGame(!shareGame)}>{buttonText}</button>
      </div>
    </div>
  );
};

export default ShareGame;
