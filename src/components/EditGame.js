import React from 'react';

const EditGame = props => {
  if (props.game) {
    return (
      <div>
        <div className="editfields">
          <div>
            <label>Number Of Players: </label>
            {props.addingGame
              ? <input
                  type="number"
                  min="2"
                  name="players"
                  placeholder="players"
                  value={props.game.players}
                  onChange={props.onChange}
                />
              : <label className="value">
                  {props.game.players}
                </label>}
          </div>
          <div>
            <label>name: </label>
            <input
              name="name"
              value={props.game.name}
              placeholder="name"
              onChange={props.onChange}
            />
          </div>
        </div>
        <button onClick={props.onCancel}>Cancel</button>
        <button onClick={props.onSave}>Save</button>
      </div>
    );
  } else {
    return <div />;
  }
};

export default EditGame;
