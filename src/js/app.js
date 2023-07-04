import { Widget } from "../js/widget";

let container = document.querySelector(".container");
const widget = new Widget(container);
widget.bindToDOM();

const cardsColumns = document.querySelectorAll(".cards");
let actualCard;

const getStyles = (el) => {
  return window.getComputedStyle(el);
};

const proection = (el) => {
  const div = document.createElement("div");
  div.classList.add("proection");
  div.style.height = getStyles(el).height;
  return div;
};

for (let cardColumn of cardsColumns) {
  cardColumn.addEventListener("mousedown", (e) => {
    e.preventDefault();

    actualCard = e.target;
    actualCard.style.width = getStyles(actualCard).width;
    actualCard.style.height = getStyles(actualCard).height;

    const proectionCard = proection(actualCard);

    if (e.target.classList.contains("card")) {
      actualCard.classList.add("dragged");
    } else {
      return;
    }

    let shiftX = e.clientX - actualCard.getBoundingClientRect().left;
    let shiftY = e.clientY - actualCard.getBoundingClientRect().top;

    const onMouseMove = (e) => {
      let target = e.target;
      let position =
        target.getBoundingClientRect().height / 2 > e.offsetY
          ? "beforebegin"
          : "afterend";

      if (target.classList.contains("card")) {
        target.insertAdjacentElement(position, proectionCard);
      }
      if (target.classList.contains("cards")) {
        target.append(proectionCard);
      }

      actualCard.style.top = e.pageY - shiftY + "px";
      actualCard.style.left = e.pageX - shiftX + "px";
    };

    const onMouseUp = () => {
      actualCard.classList.remove("dragged");
      actualCard.style.top = "unset";
      actualCard.style.left = "unset";
      proectionCard.replaceWith(actualCard);
      actualCard = undefined;

      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mousemove", onMouseMove);

      let container = document.querySelector(".container");
      localStorage.setItem("container", container.innerHTML);
    };

    document.documentElement.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mousemove", onMouseMove);
  });
}
