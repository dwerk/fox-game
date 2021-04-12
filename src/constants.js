//The number of milliseconds in the browser for one tick
export const ICONS = ["fish", "poop", "weather"];
export const TICK_RATE = 3000;
export const RAIN_CHANCE = 0.2;
export const SCENES = ["day", "rain"];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 4;

export const DEAD = "DEAD";
export const SLEEP = "SLEEP";
export const HUNGRY = "HUNGRY";
export const HATCHING = "HATCHING";
export const IDLING = "IDLING";
export const POOPING = "POOPING";
export const CELEBRATING = "CELEBRATING";
export const FEEDING = "FEEDING";
export const INIT = "INIT";

export const getNextHungerTime = clock => Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime = clock => Math.floor(Math.random() * 2) + 3 + clock;
export const getNextPoopTime = clock => Math.floor(Math.random() * 3) + 4 + clock;
