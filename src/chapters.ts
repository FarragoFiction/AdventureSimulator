//did you know we do this at work?
//can i convey to you the white hot anger i experience
//every time i try to track down some css class or another
//only to discover its defined in the html itself,
// injected fuck deep in some forgotten maze
//this hate is my gift to you

import { Chapter, UNKNOWN } from "./chapter";



//  new Intermission("Intermission",["CFO"],"quip ",false,"http"),

const chapters: Chapter[] = [
  new Chapter("Intermission -2", ["CFO/Flower Chick"], "She really is tired of dealing with auditors. ", true, "flower_chick_and_the_auditor.txt"),
  new Chapter("Intermission -1", ["Wanda/CEBro, Flower Chick"], "A Quest For The Perfect Meme At the Perfect Time.", true, "wanda_and_the_meme.txt"),
  new Chapter("Loop 1: [DATA EXPUNGED] ENDING", ["TODO"], "It was a mistake to make: http://www.farragofiction.com/NagaGirlfriend/", false, "data_expunged_ending.txt"),
  new Chapter("Intermission 1", ["Himbo"], "He met the most beautiful girl...", false, "intermission1.txt"),
  new Chapter("Intermission 2", ["Hostage"], "Sedation really did a number on him...", false, "intermission2.txt"),
  new Chapter("Loop 2: CRIMINAL ENDING", ["todo"], "'giving twitch chat a gun was a terrible idea' - The Catalyst", false, "criminal_ending.txt"),
  new Chapter("Happy 50th Anniversary, Zampanio!!!", ["All of Us Togther"], "It's so crazy that I got into Zampanio just in time to celebrate such a huge milestone.", false, "happy_fifty_years_zampanio.txt"),
  new Chapter("Backup Savefile", ["TODO"], "The Universe is in Safe Mode. ", false, "backup.txt"),
  new Chapter("Intermission 3", ["Eye Killer, Hostage, Himbo"], "To horses, everything is Silent Hill...", false, "intermission-eyekiller.txt"),
  new Chapter("Intermission 4", ["The End/ Camille"], "The consequences of your taunts...", false, "intermission3-end.txt"),
  new Chapter("Loop 3: Inexplicable Spiral", ["TODO"],  "'twitch chat defends itself in court, the long awaited sequel to twitch chat has a gun' --The Catalyst ", false, "inexplicable_spiral.txt"),
  new Chapter("Intermission 5", ["Yongki","Witherby","K"], "Yongiki[sic] Makes New Friends ", false, "yongki_intermission.txt"),
  new Chapter("Arm2-Loop1", [""], "What have you done??? ", false, "arm2.txt"),
  new Chapter("Time Paradox", ["Parker","Doc Slaughter","Vik","Camille","Peewee","Devona","Neville","Witherby","???","Closer","CFO","Rod"], "The Universe is in Safe Mode.", false, "safe_mode.txt"),

  new Chapter("Time Paradox", ["Parker","Doc Slaughter","Vik","Camille","Peewee","Devona","Neville","Witherby","???","Closer","CFO","Rod"], "Peewee's despair comes to a head, even as we give him a little break... It can only go up from here. Collides with Safe Mode and causes a Glitch.", false, "time_paradox.txt"),
  new Chapter("JR Rambles About Spoilers", [], "IC asks JR to make a recap. JR fails miserably.", false, "jr_rambles_about_spoilers.txt"),
  
  new Chapter("Peewee: DadQuest", [], "Peewee has somehow shaken loose of their narrative role. Who will he be?", false, "dad_quest.txt"),
  new Chapter("Lavinraca", [], "Halloween only comes once a year :)", false, "lavinraca.txt"),

  new Chapter("Current Savefile", ["TODO"], "It's time for Peewee to make a Choice.", false, "current_save.txt"),

]


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

export const renderChapters = (force: boolean) => {
  const ele = document.querySelector("#intermission");
  console.log("JR NOTE: rendering intermission...ele is", ele)

  if (!ele || (!force &&ele.innerHTML !== "LOADING...")) {
    console.log("JR NOTE: it is not time to render")
    return;
  }
  ele.innerHTML = "<p id='title'>Chapter List</p>";
  full_of_rage_hack_the_stylesheets(ele);

  //do this first so i know how to order them
  for (let chapter of chapters) {
    chapter.gatherMetadata();
  }

  const compare = (a: Chapter, b: Chapter) => {
    //mostly i care about the case where theres sane things to compare
    if (a.date && b.date) {
      if (a.date !== UNKNOWN && b.date !== UNKNOWN) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    }
    if (a.date) {
      return 0;
    }

    return 1;
  }
  chapters.sort(compare);
  for (let chapter of chapters) {
    chapter.renderSelf(ele);
  }

}