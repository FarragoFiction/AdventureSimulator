//did you know we do this at work?
//can i convey to you the white hot anger i experience
//every time i try to track down some css class or another
//only to discover its defined in the html itself,
// injected fuck deep in some forgotten maze
//this hate is my gift to you
const full_of_rage_hack_the_stylesheets = (ele: Element) => {
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
    font-family: helvetica;
    font-size: 18px;
  }
  
  .date{
    padding-left: 5px;
    font-family: helvetica;
    font-size: 12px;

  }

  .size{
    padding-left: 5px;
    font-family: helvetica;
    font-size: 12px;

  }
  `;
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

  constructor(title: string, characters: string[], quip: string, hidden: boolean, href: string,) {
    this.title = title;
    this.href = href;
    this.characters = characters;
    this.hidden = hidden;
    this.quip = quip;
    this.id = id;
    id++;
  }

  //but the bullshit i suffer at work, i can use for art
  full_of_hope_hack_the_stylesheets = (ele: Element) => {
    const fantastic_idea = document.createElement("style");
    const styles = `
    #link-${this.id}{
      secret_char_list: ${this.characters};
    }`;
    fantastic_idea.appendChild(document.createTextNode(styles));
    ele.append(fantastic_idea);
  }

  //https://stackoverflow.com/questions/2313620/is-it-possible-to-retrieve-the-last-modified-date-of-a-file-using-javascript
  gimmeFacts = () => {
    console.log("JR NOTE: getting facts for", this.href);
    try {
      var req = new XMLHttpRequest();
      req.open("HEAD", data_location + this.href, false);
      req.send(null);
      if (req.status == 200) {
        let date = req.getResponseHeader("Last-Modified");
        let size = req.getResponseHeader("Content-Length");
        if (!date) {
          date = "UNKNOWN";
        }
        if (!size) {
          size = "UNKNOWN";
        }
        return { date, size };

      }
      else return { date: "UNKNOWN", size: "UNKNOWN" }
    } catch (err: any) {
      console.error(err);
      return { date: "UNKNOWN", size: "UNKNOWN" }
    }
  }

  //okay yeah, react is useful because it has jsx, but i am feeling ornery

  renderSelf = (ele: Element) => {
    const facts = this.gimmeFacts();
    const date = document.createElement("span");
    date.innerHTML = "(Saved On: " + facts.date+")";
    date.className ="date";

    const size = document.createElement("span");
    size.className  ="size";
    if(facts.size === "UNKNOWN"){
      size.innerHTML = " (" + facts.size+")";
    }else{
      size.innerHTML = "("+(parseInt(facts.size)*.000125).toFixed(2)+"Kb)";
    }

    const p = document.createElement("p");


    const a = document.createElement("a");
    this.full_of_hope_hack_the_stylesheets(ele);
    a.id = `link-${this.id}`;
    a.href = pretty_location + this.href;
    a.innerHTML = this.title;
    p.append(a);

    p.append(size);


    const span = document.createElement("div");
    span.innerHTML = this.quip;
    span.className = "quip";
    p.append(date);

    p.append(span);


    ele.append(p);
  }
}

//  new Intermission("Intermission",["CFO"],"quip ",false,"http"),

const data_location = "http://www.farragofiction.com/SettlersFromTheWest/";
const pretty_location = "http://farragofiction.com/AdventureSimWest/?nostalgia=";

const intermissions: Intermission[] = [
  new Intermission("Intermission -2", ["CFO/Flower Chick"], "She really is tired of dealing with auditors. ", true, "flower_chick_and_the_auditor.txt"),
  new Intermission("Intermission -1", ["Wanda/CEBro, Flower Chick"], "A Quest For The Perfect Meme At the Perfect Time.", true, "wanda_and_the_meme.txt"),
  new Intermission("Loop 1: [DATA EXPUNGED] ENDING", ["TODO"], "It was a mistake to make: http://www.farragofiction.com/NagaGirlfriend/", false, "data_expunged_ending.txt"),
  new Intermission("Intermission 1", ["Himbo"], "He met the most beautiful girl...", false, "intermission1.txt"),
  new Intermission("Intermission 2", ["Hostage"], "Sedation really did a number on him...", false, "intermission2.txt"),
  new Intermission("Loop 2: CRIMINAL ENDING", ["todo"], "'giving twitch chat a gun was a terrible idea' - The Catalyst", false, "criminal_ending.txt"),
  new Intermission("Happy 50th Anniversary, Zampanio!!!", ["All of Us Togther"], "It's so crazy that I got into Zampanio just in time to celebrate such a huge milestone.", false, "happy_fifty_years_zampanio.txt"),
  new Intermission("Current Savefile", ["TODO"], "'twitch chat defends itself in court, the long awaited sequel to twitch chat has a gun' --The Catalyst ", false, "hanging_with_the_solemn_after_killing_his_boss.txt"),
  new Intermission("Intermission 4", ["Eye Killer, Hostage, Himbo"], "To horses, everything is Silent Hill...", false, "intermission-eyekiller.txt"),
  new Intermission("Intermission 5", ["The End/ Camille"], "The consequences of your taunts...", false, "intermission3-end.txt"),

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

  for (let intermission of intermissions) {
    intermission.renderSelf(ele);
  }

}