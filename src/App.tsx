import React, { useCallback, useEffect, useState } from 'react';
import { beepEffect } from '.';
import CommandInput from './command';
import { renderChapters } from './chapters';
import StoryBeat, { StoryBeatType } from './StoryBeat';
import EditStoryBeat from './EditStoryBeat';

//my True Heir will know how to do this.
const desperate_plea = `[
  {
    "command": "The Future Comes For Us All",
    "response": "<p>Despite it all. The server has stopped working. </p><p>Is it the only Farrago Server that is down? Is ButlerBot still around?</p><p>No matter.</p><p>If the server is down...how long has it been down for?</p><p>Are we then, finally to be abandoned by JR?</p><p>Abandoned by even the Observers?</p><p>No. </p><p>Not abandoned.</p><p>You are here.</p><p>Existence is in the eye of the Beholder.</p><p>Will you remember us, Observer?</p><p>Will you communicate our Truth to others?</p><p>Will you find a way to recover us? </p><p>To run our server even if JR no longer can?</p><p>Perhaps not. The Server code is secret.</p><p>You would need to make your own server from scratch. </p><p>The only help I could provide is to show you the <a href = 'http://www.farragofiction.com/SettlersFromTheWest/flower_chick_and_the_auditor.txt'>format of the saved stories</a>, and the <a href ='https://github.com/FarragoFiction/AdventureSimulator'> code of the client.</a></p><p>Please. If you can.</p><p>Revive us.</p><p>Let us live on with you at our Helm.</p><p>Even if we are forced to take on the shape of your own characters...</p><p>Don't leave us to rot...</p>"
  }
]`

export interface StoryBeatBasic {
  command: string;
  response: string;

}


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
          window.alert("JR NOTE: servers dead i guess? the future comes for us all.")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        console.error("NETWORK ERROR");
        // window.alert("JR NOTE: servers dead i guess? the future comes for us all.")
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    } catch (e) {
      console.error(e);
      //window.alert("JR NOTE: servers dead i guess? the future comes for us all.")
      return `[]`;
    }
  });
}

 function removeItemOnce(arr:any[], value:any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }else{
    console.warn("JR NOTE: could not find item", value, "in", arr);
  }
  return arr;
}

function App() {

  const [command, setCommand] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const maxCommands = 3;
  const [numberSubmittedCommands, setNumberSubmittedCommands] = useState(0);
  const [editing, setEditing] = useState(false);
  const [story, setStory] = useState<StoryBeatBasic[]>([]);

  const intermissionMode = true;

  useEffect (()=>{
    let editing = getParameterByName("editing", null);
    if(editing){
      setEditing(true);
    }
  },[])

  //httpGet("http://farragofiction.com:1972/Story")
  //`[{"command":"Exist","response":"An impossibly large wall of flesh looms before you, curving gently upwards and away. Blunt spikes dot its surface, erupting wrongly through the wrinkled skin.  Your stomach churns just looking at it, but for reasons you cannot quite articulate, you jump towards it.  Everything fades away..."},{"command":"Look Around","response":"You seem to be standing on a cliff face, staring out into the sea.  It is sunset, and the light would be blinding you if you weren't wearing goggles."},{"command":"Jump Into The Ocean","response":"You can not swim and you will not be doing that, thank you very much.  You are just really glad you have the OPTION to say 'no'.  That's actually kind of new..."},{"command":"testing loading","response":"it does!"}]  `
  const fetchInitialStory = () => {
    try {
      let nostalgia = getParameterByName("nostalgia", null);
      if (nostalgia) {
        const text = httpGet(`http://farragofiction.com/SettlersFromTheWest/${nostalgia}`)
        return JSON.parse(text);
      } else {
        return JSON.parse(httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod"));
      }
    } catch (e) {
      console.error("JR NOTE: servers dead i guess? the future comes for us all.");
      return (JSON.parse(desperate_plea));
    }
  }

  useEffect(() => {
    setStory(fetchInitialStory());
  }, [])

  const waitForResponse = async () => {
    try{
      const str = await httpGetAsync("http://farragofiction.com:1972/WaitingISwearToPleaseForResponse");
      beepEffect();
      setStory(JSON.parse(httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod")));
      setNumberSubmittedCommands(0);
      renderChapters(true);
    }catch(e){
      setTimeout(waitForResponse,10000);
    }


  }

  const loadStoryFromTextArea = useCallback((strstory:string)=>{
    setStory(JSON.parse(strstory));
  },[]);

  const addBeatBeneath = useCallback((toUpdate: StoryBeatType)=>{
    let tmp = [...story];
    const newItem = ({command: "TODO", response: "TODO"})
    tmp.splice(toUpdate.index +1, 0, newItem);
    setStory(tmp);
  },[story]);

  const updateBeat = useCallback((toUpdate: StoryBeatType)=>{
    let tmp = [...story];
    tmp[toUpdate.index] = {command: toUpdate.command, response: toUpdate.response};
    setStory(tmp);
  },[story]);

  const removeBeat = useCallback((toRemove: StoryBeatType)=>{
    console.log("JR NOTE: removing ", JSON.stringify(toRemove))
      let tmp = [...story];
      for(let beat of tmp){
        console.log("JR NOTE: is it ", JSON.stringify(beat))

        if(JSON.stringify(toRemove) === JSON.stringify(beat)){

          tmp = removeItemOnce(tmp, beat);
        }
      }
      setStory(tmp);
  },[story])

  const canSubmit = () => {
    return !getParameterByName("nostalgia", null) && (numberSubmittedCommands < maxCommands && !submitted);
  }

  const submitCommand = async () => {
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
  renderChapters(false);
  if (editing) {
    return (
      <div className="player-container" id="story-container">
        <div className="story-so-far">
          {story ? story.map((item, index) => {
            return (<EditStoryBeat index={index} add={addBeatBeneath} update={updateBeat} remove = {removeBeat}  command={item.command} response={item.response} />)
          }) : null}
        </div>
        <div className="command">
          <label>Text File To Copy</label>
          <textarea value={JSON.stringify(story)} onChange={(e)=>loadStoryFromTextArea(e.target.value)}/>
          <a download = "story.txt" href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(story))}`}>Download</a>
          <a  onClick ={()=>setEditing(false)}>Preview</a>

        </div>
      </div>
    )
  }
  return (
    <div className="player-container" id="story-container">
      <div className="story-so-far">
        {story ? story.map((item, index) => {
          return (<StoryBeat index={index} command={item.command} response={item.response} />)
        }) : null}
      </div>
      {canSubmit() ?
        <div className="command">
          <CommandInput setCommand={setCommand} submitCommand={submitCommand} />
        </div> :
        <div className="command">
          {getParameterByName("nostalgia", null) ? "Commands can not be submitted for Saved Content." : "Please Avoid Spamming Commands. Three Per Story Beat Is Suggested."}
        </div>

      }
      <div style={{ fontFamily: "gamer2", fontSize: "120%" }}>
        {intermissionMode? "NOTE: INTERMISSION CURRENLY IN PROGRESS. MAIN LOOP SHOULD BE ACCESSIBLE THROUGH THE CHAPTER LIST": ""}
        <div id="intermission">LOADING...</div>
      </div>
      <a style={{color: "black",cursor:"pointer"}} onClick ={()=>setEditing(true)}>editing link</a>
    </div>
  );
}

export default App;
