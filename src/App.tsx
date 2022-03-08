import React, { useEffect, useState } from 'react';
import { beepEffect } from '.';
import CommandInput from './command';
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
    console.log("JR NOTE: fetch initial story")
    let nostalgia = getParameterByName("nostalgia", null);
    if (nostalgia) {
      const text = httpGet(`http://farragofiction.com/SettlersFromTheWest/${nostalgia}`)
      console.log("JR NOTE: nostalgia is ", nostalgia, text);
      return JSON.parse(text);
    } else {
      return JSON.parse(httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod"));
    }
  }
  const [story, setStory] = useState<StoryBeatType[]>([]);

  useEffect(()=>{
    setStory(fetchInitialStory());
  },[])

  const waitForResponse = async () => {
    console.log("JR NOTE: waiting for response");
    const str = await httpGetAsync("http://farragofiction.com:1972/WaitingISwearToPleaseForResponse");
    beepEffect();
    setStory(JSON.parse(httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod")));
    setNumberSubmittedCommands(0);
  }

  const canSubmit = () => {
    return !getParameterByName("nostalgia", null) && (numberSubmittedCommands < maxCommands && !submitted);
  }

  const submitCommand = async () => {
    console.log("JR NOTE: submit command");
    if (!canSubmit()) {
      return;
    }
    setSubmitted(true);
    setNumberSubmittedCommands(numberSubmittedCommands + 1);
    const params = `command=${encodeURIComponent(command.substring(0, 1000))}`;
    //encodeURIComponent
    await httpGetAsync(`http://farragofiction.com:1972/PlayerPleaseCommand?${params}`);
    setSubmitted(false);
  }

  useEffect(() => {
    console.log("JR NOTE: use effect with story");
    if (getParameterByName("nostalgia", null)) {
      return;
    }
    const ele = document.querySelector(".story-so-far");
    if (ele) {
      ele.scrollTo(0, ele.scrollHeight);
    }

    waitForResponse();
  }, [story])
  //NOTE to self: if i'm ever ready to let AdventureSim end, copy BB's Feelings.dart and etc back into HB and let him take over DMing.
  //once he gets his feelings back, Hearlessbot is a very angry, very sweary boi.  He has a LOT of backpay from running adventure sim and he's spending butlerbux like its going out of style.
  /*
  http://www.farragofiction.com/DollSim/index.html?Rebel+Cassan%3A___ArBgAAAD2xUrtrwwXc1QLLSQQPSUAAAAAAAAA_wAAAADmxy3lvCrZpBL2xUrtrww7qA8TKh8AAAAAAABJSUlpuMj2xQBQUAAIgI0BGgICAW8BC-B0QCMARgHsD3g
  http://www.farragofiction.com/DollSim/index.html?Rod+Cassan%3A___ArBgAAAD2xUrtrwyFr_94nuZzk9AAAAAAAAAA_wAAAADmxy3lvCrZpBL2xUrtrwxhxF86fkcA_wAA_wBJSUlpuMj2xQBQUAAI4FWASsB-_QAowAUYB7A94A%3D
  http://www.farragofiction.com/DollSim/index.html?Melon+Cassan%3A___ArBgAAAD2xUrtrwx59WFIuCgupB4AAAAAAAAA_wAAAADmxy3lvCrZpBI9pErtrwxhxF86fkcA_wAA_wBJSUlpuMinAPVQUAAIgXQLoGGAXQAyngbEAJrAE1gewPe
  */
  return (
    <div className="player-container" id="story-container">
      <div className="story-so-far">
        {story.map((item, index) => {
          return (<StoryBeat key={index} command={item.command} response={item.response} />)
        })}
      </div>
      {canSubmit() ?
        <div className="command">
          <CommandInput setCommand={setCommand} submitCommand={submitCommand}/>
        </div> :
        <div className="command">
          {getParameterByName("nostalgia", null)?"Commands can not be submitted for Saved Content.":"Please Avoid Spamming Commands. Three Per Story Beat Is Suggested."}
        </div>

      }
      <div style={{fontFamily: "gamer2",fontSize: "120%"}}>
    <p><a href ='http://farragofiction.com/AdventureSimWest/?nostalgia=intermission1.txt'>Intermission1</a></p>
    <p><a href ='http://farragofiction.com/AdventureSimWest/?nostalgia=data_expunged_ending.txt'>[DATA EXPUNGED] ENDING</a></p>
    <p><a href ='http://farragofiction.com/AdventureSimWest/?nostalgia=intermission2.txt'>Intermission2</a></p>
    </div>

    </div>
  );
}

export default App;
