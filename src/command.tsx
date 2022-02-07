import React, { FormEventHandler, Fragment, useState } from 'react';


export interface CommandInputType {
  setCommand: Function;
  submitCommand: Function;

}

const CommandInput: React.FC<CommandInputType> = ({ setCommand, submitCommand }) => {
  return (
  <Fragment>
          {">"}
          <form style={{display: 'inline-block'}} action="" method="post" onSubmit={submitCommand as FormEventHandler}>
            <input onChange={(e) => setCommand(e.target.value)} autoFocus placeholder='Input Suggestion'></input><button type="submit" onClick={() => submitCommand()}>Submit</button>
          </form>
  </Fragment>

  );
}

export default CommandInput;
