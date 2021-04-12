import {modFox, modScene, togglePoopBag, writeModal} from "./ui";
import {RAIN_CHANCE, SCENES, DAY_LENGTH, NIGHT_LENGTH, getNextDieTime, getNextHungerTime, getNextPoopTime} from "./constants";

//State of the game
const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  tick() {
    this.clock ++;
    console.log("clock", this.clock);
    //when proper time to wake, call the wake function
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry()
    } else if (this.clock === this.dieTime) {
      this.die()
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }
    return this.clock;
  },
  //Start of the game
  startGame() {
    console.log("hatching");
  //The fox hatches when you start the game
    this.current = "HATCHING";
  //The fox wakes up 3 seconds after starting the game
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModal();
  },
  wake() {
    console.log("awoken");
    this.current = "IDLING";
    this.wakeTime = -1;
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH
    this.hungryTime = getNextHungerTime(this.clock);
    this.determineFoxState();
  },
  sleep(){
    this.state = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  clearTimes() {
    this.wakeTime = -1,
    this.sleepTime= -1,
    this.hungryTime= -1,
    this.dieTime= -1,
    this.poopTime= -1,
    this.timeToStartCelebrating =-1,
    this.timeToEndCelebrating= -1
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
  die() {
    this.current = "DEAD";
    modScene("dead");
    modFox("dead");
    this.clearTimes();
    writeModal("The fox died :( <br/> Press the middle button to start");
  },
  startCelebrating() {
    console.log("Celebrating ")
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1,
    this.timeToEndCelebrating = this.clock + 2;
  }, endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === "IDLING" ) {
      if (SCENES[this.scene] === "rain") {
        modFox("rain")
      }
     else {
      modFox("idling");
    }
  }
  },
  handleUserAction(icon) {
    //When the fox is in any of these at the current time we do not handle the users action
    if (["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      //DO NOTHING
      return;
    }
    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return
    }

    //if the icon is weather, poop or fish call the appropriate function
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("Change weather");
 this.scene = (this.scene +1) % SCENES.length;
 modScene(SCENES[this.scene]);
 this.determineFoxState();
  },
  cleanUpPoop() {
    if (this.current !== "POOPING") {
      return;
    }
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock);
  console.log("cleanUpPoop");
  },
  feed() {
    if (this.current !== "HUNGRY") {
      return;
    }
    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
    console.log("feed");
  },
};

//Pull out handleUserAction and bind the context to gameState
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
