import React, { useState } from 'react';
import StoryBeat, { StoryBeatType } from './StoryBeat';



const  httpGet =(theUrl:string)=>
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function App() {
  //httpGet("http://farragofiction.com:1972/Story")
  //`[{"command":"Exist","response":"An impossibly large wall of flesh looms before you, curving gently upwards and away. Blunt spikes dot its surface, erupting wrongly through the wrinkled skin.  Your stomach churns just looking at it, but for reasons you cannot quite articulate, you jump towards it.  Everything fades away..."},{"command":"Look Around","response":"You seem to be standing on a cliff face, staring out into the sea.  It is sunset, and the light would be blinding you if you weren't wearing goggles."},{"command":"Jump Into The Ocean","response":"You can not swim and you will not be doing that, thank you very much.  You're just really glad you have the OPTION to say 'no'.  That's actually kind of new..."},{"command":"testing loading","response":"it does!"}]  `
  const [story, setStory] = useState<StoryBeatType[]>(JSON.parse(httpGet("http://farragofiction.com:1972/Story")));
  console.log("JR NOTE: story is", story);
  return (
    <div className="container">
      <div className="story-so-far">
        {story.map((item,index)=>{
          return(<StoryBeat key={index} command={item.command} response={item.response}/>)
        })}
      </div>
      <div className="command">
        {">"}<input autoFocus placeholder='Input Suggestion'></input><button>Submit</button>
      </div>
    </div>
  );
}

export default App;
