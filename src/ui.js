export const modFox = function modFox(state) {
  //when passing the classname will give the appopriate state of the fox
  document.querySelector(".fox").className = `fox fox--state-${state}`;
}

export const modScene = function modScene(state) {
  //when passing the classname will give the appopriate scene of the background
  document.querySelector(".game").className = `game game--state-${state}`;
}

export const togglePoopBag = function togglePoopBag(show) {
  //If we are in hidden class do not show the poop bag
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

export const writeModal = function writeModal (text = "") {
  document.querySelector(".modal").innerHTML = `<div class="modal-inner">${text}</div>`
}
