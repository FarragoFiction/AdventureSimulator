//did you know we do this at work?
//can i convey to you the white hot anger i experience
//every time i try to track down some css class or another
//only to discover its defined in the html itself,
// injected fuck deep in some forgotten maze
//this hate is my gift to you
const full_of_rage_hack_the_stylesheets=(ele:Element)=>{
  const bad_idea = document.createElement("style");
  const styles = `
  #intermission{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 13px;
    width: 815px;
  }
  #title{
    font-size: 52px;
  }
  .quip{
    padding-left: 15px;
  }`;
  bad_idea.appendChild(document.createTextNode(styles));
  ele.append(bad_idea);
}

let id = 0;


//honestly react has its uses but rendering static content is NOT one of them
class Intermission {
  title: string;
  href: string;
  quip: string;
  wordCount?: number;
  characters: string[];
  hidden: boolean;
  id: number;

  constructor(title:string ,characters:string[], quip:string, hidden: boolean, href:string,){
    this.title = title;
    this.href = href;
    this.characters = characters;
    this.hidden = hidden;
    this.quip = quip;
    this.id = id;
    id ++;
  }

  //but the bullshit i suffer at work, i can use for art
  full_of_hope_hack_the_stylesheets=(ele:Element)=>{
    const fantastic_idea = document.createElement("style");
    const styles = `
    #link-${this.id}{
      secret_char_list: ${this.characters};
    }`;
    fantastic_idea.appendChild(document.createTextNode(styles));
    ele.append(fantastic_idea);
  }
  
  renderSelf =(ele: Element)=>{
    const p = document.createElement("p");
    const a = document.createElement("a");
    this.full_of_hope_hack_the_stylesheets(ele);
    a.id = `link-${this.id}`;
    a.href = this.href;
    a.innerHTML = this.title;
    p.append(a);

    const span = document.createElement("span");
    span.innerHTML = this.quip;
    span.className = "quip";

    p.append(span);

    ele.append(p);


  }
}

//  new Intermission("Intermission",["CFO"],"quip ",false,"http"),

const intermissions:Intermission[] = [
  new Intermission("Intermission -2",["CFO/Flower Chick"],"She really is tired of dealing with auditors. ",true,"http://farragofiction.com/AdventureSimWest/?nostalgia=flower_chick_and_the_auditor.txt"),
  new Intermission("Intermission -1",["Wanda/CEBro, Flower Chick"],"A Quest For The Perfect Meme At the Perfect Time.",true,"http://farragofiction.com/AdventureSimWest/?nostalgia=wanda_and_the_meme.txt"),
  new Intermission("Loop 1: [DATA EXPUNGED] ENDING",["TODO"],"It was a mistake to make: http://www.farragofiction.com/NagaGirlfriend/",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=data_expunged_ending.txt"),
  new Intermission("Intermission 1",["Himbo"],"He met the most beautiful girl...",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=intermission1.txt"),
  new Intermission("Intermission 2",["Hostage"],"Sedation really did a number on him...",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=intermission2.txt"),
  new Intermission("Loop 2: CRIMINAL ENDING",["todo"],"'giving twitch chat a gun was a terrible idea' - The Catalyst",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=criminal_ending.txt"),
  new Intermission("Happy 50th Anniversary, Zampanio!!!",["All of Us Togther"],"It's so crazy that I got into Zampanio just in time to celebrate such a huge milestone.",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=happy_fifty_years_zampanio.txt"),
  new Intermission("Current Savefile",["TODO"],"'twitch chat defends itself in court, the long awaited sequel to twitch chat has a gun' --The Catalyst ",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=hanging_with_the_solemn_after_killing_his_boss.txt"),
  new Intermission("Intermission 4",["Eye Killer, Hostage, Himbo"],"To horses, everything is Silent Hill...",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=intermission-eyekiller.txt"),
  new Intermission("Intermission 5",["The End/ Camille"],"The consequences of your taunts...",false,"http://farragofiction.com/AdventureSimWest/?nostalgia=intermission3-end.txt"),

]



export const renderIntermissions = () => {
  const ele = document.querySelector("#intermission");
  console.log("JR NOTE: rendering intermission...ele is", ele)

  if (!ele || ele.innerHTML !== "LOADING...") {
    console.log("JR NOTE: it is not time to render")
    return;
  }
  ele.innerHTML = "<p id='title'>Chapter List</p>";
  full_of_rage_hack_the_stylesheets(ele);

  for(let intermission of intermissions){
    intermission.renderSelf(ele);
  }

}