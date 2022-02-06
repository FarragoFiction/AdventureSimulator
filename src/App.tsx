import React, { useEffect, useState } from 'react';
import { beepEffect } from '.';
import StoryBeat, { StoryBeatType } from './StoryBeat';


export function getParameterByName(name: string, url: string | null) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


const httpGet = (theUrl: string) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}


const httpGetAsync = async (theUrl: string) => {
  return new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    try {
      xhr.open("get", theUrl);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    } catch (e) {
      console.error(e);
      window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
      return `[]`;
    }
  });
}

function App() {

  const [command, setCommand] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const maxCommands = 3;
  const [numberSubmittedCommands, setNumberSubmittedCommands] = useState(0);

  //httpGet("http://farragofiction.com:1972/Story")
  //`[{"command":"Exist","response":"An impossibly large wall of flesh looms before you, curving gently upwards and away. Blunt spikes dot its surface, erupting wrongly through the wrinkled skin.  Your stomach churns just looking at it, but for reasons you cannot quite articulate, you jump towards it.  Everything fades away..."},{"command":"Look Around","response":"You seem to be standing on a cliff face, staring out into the sea.  It is sunset, and the light would be blinding you if you weren't wearing goggles."},{"command":"Jump Into The Ocean","response":"You can not swim and you will not be doing that, thank you very much.  You're just really glad you have the OPTION to say 'no'.  That's actually kind of new..."},{"command":"testing loading","response":"it does!"}]  `
  const fetchInitialStory = () => {
    let nostalgia = getParameterByName("nostalgia", null);
    if (nostalgia) {
      const text = httpGet(`http://farragofiction.com/SettlersFromTheWest/${nostalgia}`)
      console.log("JR NOTE: nostalgia is ", nostalgia, text);
      return JSON.parse(text);
    } else {
      return JSON.parse(httpGet("http://farragofiction.com:1972/Story"));
    }
  }
  const [story, setStory] = useState<StoryBeatType[]>(fetchInitialStory());
  console.log("JR NOTE: story is", story);

  const waitForResponse = async () => {
    console.log("JR NOTE: waiting for response");
    const str = await httpGetAsync("http://farragofiction.com:1972/WaitingForResponse");
    beepEffect();
    setStory(JSON.parse(httpGet("http://farragofiction.com:1972/Story")));
  }

  const canSubmit = () => {
    return numberSubmittedCommands <= maxCommands && !submitted;
  }

  const submitCommand = async () => {
    if (!canSubmit()) {
      return;
    }
    setSubmitted(true);
    setNumberSubmittedCommands(numberSubmittedCommands + 1);
    const params = `command=${encodeURIComponent(command)}`;
    //encodeURIComponent
    await httpGetAsync(`http://farragofiction.com:1972/PlayerCommand?${params}`);
    setSubmitted(false);
  }

  useEffect(() => {
    if (getParameterByName("nostalgia", null)) {
      return;
    }
    const ele = document.querySelector(".story-so-far");
    if (ele) {
      ele.scrollTo(0, ele.scrollHeight);
    }

    waitForResponse();
  }, [story])

  return (
    <div className="container" id="story-container">
      <div className="story-so-far">
        {story.map((item, index) => {
          return (<StoryBeat key={index} command={item.command} response={item.response} />)
        })}
      </div>
      {canSubmit() ?
        <div className="command">
          {">"}
          <form style={{display: 'inline-block'}} action="" method="post" onSubmit={submitCommand}>
            <input onChange={(e) => setCommand(e.target.value)} autoFocus placeholder='Input Suggestion'></input><button type="submit" onClick={() => submitCommand()}>Submit</button>
          </form>
        </div> :
        <div className="command">
          Please Avoid Spamming Commands. Three Per Story Beat Is Suggested.
        </div>

      }

    </div>
  );
}

export default App;
