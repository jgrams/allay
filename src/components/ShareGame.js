import React, { useState } from 'react';

const ShareGame = props => {
  const [shareGame, setShareGame] = useState(props.shareGame);
  let linkList;
  let buttonText;

  if (shareGame) {
    let linkUrl;
    let adminUrl;
    const linkBase = "?id=" + props.game._id + "&player=";
    buttonText = "Hide Sharing";
    
    linkList = props.game.players.map(function(player, index) {
      linkUrl = linkBase + player.slug;
      if (index !== 0) {
        return <li>Shared Link: <a href={linkUrl}>{linkUrl}</a></li>
      } else {  
        adminUrl = linkUrl + "&admin=" + props.game.admin;
        return <li>Your Link: <a href={adminUrl}>{adminUrl}</a></li>
      }
    });
  } else {
    buttonText = "Enable Sharing"
  }

  return (
    <div className="shareGame">
      <div>
        <ul className="heros">
          {linkList}
        </ul>
       <button onClick={() => setShareGame(!shareGame)}>{buttonText}</button>
      </div>
    </div>
  );
};

export default ShareGame;
