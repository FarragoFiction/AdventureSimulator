

let id = 0;
export const UNKNOWN = "UNKNOWN";


const data_location = "http://www.farragofiction.com/SettlersFromTheWest/";
const pretty_location = "http://farragofiction.com/AdventureSimWest/?nostalgia=";
const current_location = "http://farragofiction.com/AdventureSimWest/";

//honestly react has its uses but rendering static content is NOT one of them
export class Chapter {
  title: string;
  href: string;
  quip: string;
  wordCount?: number;
  characters: string[];
  hidden: boolean;
  id: number;
  date?: string;
  size?: string;

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
          date = UNKNOWN;
        }
        if (!size) {
          size = UNKNOWN;
        }
        return { date, size };

      }
      else return { date: UNKNOWN, size: UNKNOWN }
    } catch (err: any) {
      console.error(err);
      return { date: UNKNOWN, size: UNKNOWN }
    }
  }

  gatherMetadata = () => {
    const facts = this.gimmeFacts();
    this.date = facts.date;
    this.size = facts.size;

  }

  //okay yeah, react is useful because it has jsx, but i am feeling ornery

  renderSelf = (ele: Element) => {
    const date = document.createElement("span");
    if(this.date && this.date !== UNKNOWN){
      date.innerHTML = `(Saved On: ${new Date(this.date).toLocaleDateString()}    ${new Date(this.date).toLocaleTimeString()})`;
    }else{
      date.innerHTML = "(Saved On: " +this.date + ")";

    }
    date.className = "date";

    const size = document.createElement("span");
    size.className = "size";
    if (this.size === UNKNOWN) {
      size.innerHTML = " (" + this.size + ")";
    } else if (this.size) {
      size.innerHTML = "(" + (parseInt(this.size) * .000125).toFixed(2) + "Kb)";
    }

    const p = document.createElement("p");


    const a = document.createElement("a");
    this.full_of_hope_hack_the_stylesheets(ele);
    a.id = `link-${this.id}`;
    a.href = pretty_location + this.href;
    if(this.href === "current_save.txt"){
      a.href = current_location;
    }else if (this.href === "arm2.txt"){
      a.href = "http://farragofiction.com/Arm2"
    }
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

