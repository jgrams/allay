import React, { useState } from 'react';

function Turn(props) {
  const [name, setName] = useState(props.player.name);

  return (
    <div>
      <label htmlFor={props.target}>{props.label}</label>
      <input name={props.target}
             placeholder={props.placeholder}
             value={name}
             onChange={(e) => setName(e.target.value)}>
      </input>
      <button onClick={() => props.submitPlayerName(name)}>{props.buttonText}</button>
    </div>
  );
};

export default Turn;
