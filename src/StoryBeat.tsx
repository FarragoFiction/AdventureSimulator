import React, { useState } from 'react';


export interface StoryBeatType {
  command: string;
  response: string;

}

const StoryBeat: React.FC<StoryBeatType> = ({ command, response }) => {
  return (
    <div className="storybeat">
      <div className="historical-command">{"> "}{command}</div>
      <div className="response" dangerouslySetInnerHTML={{__html: response}}></div>
    </div>
  );
}

export default StoryBeat;
