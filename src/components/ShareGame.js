import React from 'react';

const ShareGame = props => {
  if (props.shareGame && props.admin) {
    let linkList;
    linkList = props.game.players.map((player) =>  <li><a href={"?id=" + props.game._id + "&player=" + player.slug}>{"?id=" + props.game._id + "&player=" + player.slug}</a></li>);
    return (
      <div className="shareGame">
        <div>
          <ul className="heros">
            <li><a href={"?id=" + props.game._id + "&admin=" + props.game.admin}>{"?id=" + props.game._id + "&admin=" + props.game.admin}</a></li>
            {linkList}
          </ul>
          <button onClick={props.onCancel}>Hide Sharing</button>
        </div>
      </div>
    );
  } else if (props.admin) {
    return (
      <div className="shareGame">
        <button onClick={props.onClick}>Enable Sharing</button>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ShareGame;
