import React, { useState } from 'react';


export interface EditStoryBeatType {
  index: number;
  command: string;
  response: string;
  remove: Function;
  update: Function;
  add: Function;

}

const EditStoryBeat: React.FC<EditStoryBeatType> = ({ command, response,remove,index,update,add }) => {
  //console.log("JR NOTE: rerendering with", {command, response,remove,index,update})
  return (
    <div className="storybeat" key={`storybeat${index}`}>
      <input onChange={(e)=>{(update({index: index,command: e.target.value, response: response}))}} className="historical-command" value={command}></input>
      <textarea onChange={(e)=>{(update({index: index,command: command, response: e.target.value}))}}  className="response" value={response}></textarea>
      <button onClick={()=>{remove({command: command, response: response})}}>Remove Beat</button>
      <button onClick={()=>{add({index: index,command: command, response: response})}}>Add Beat Under This One</button>

    </div>
  );
}

export default EditStoryBeat;
