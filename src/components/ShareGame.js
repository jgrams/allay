import React from 'react';

const ShareGame = props => {
  if (props.shareGame && props.admin) {
    let linkList;
    const linkBase = "?id=" + props.game._id;
    const adminLink = linkBase + "&admin="
    const userLink = linkBase + "&player="
    linkList = props.game.players.map((player) =>  <li><a href={userLink + player.slug}>{userLink + player.slug}</a></li>);
    return (
      <div className="shareGame">
        <div>
          <ul className="heros">
            <li><a href={adminLink + props.game.admin}>{adminLink + props.game.admin}</a></li>
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
