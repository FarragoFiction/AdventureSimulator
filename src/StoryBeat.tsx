import React, { useState } from 'react';


export interface StoryBeatType {
  index: number;
  command: string;
  response: string;

}

const StoryBeat: React.FC<StoryBeatType> = ({ command, response,index }) => {
  return (
    <div className="storybeat" key={`storybeat${index}`}>
      <div className="historical-command">{"> "}{command}</div>
      <div className="response" dangerouslySetInnerHTML={{__html: response}}></div>
    </div>
  );
}

export default StoryBeat;
