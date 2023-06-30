import { Widget } from "../js/widget";

let container = document.querySelector(".container");
const widget = new Widget(container);
widget.bindToDOM();

const cardsColumns = document.querySelectorAll(".cards");
let actualCard;

for (let cardColumn of cardsColumns) {
  cardColumn.addEventListener("mousedown", (e) => {
    e.preventDefault();

    actualCard = e.target;

    let shiftX = e.clientX - actualCard.getBoundingClientRect().left;
    let shiftY = e.clientY - actualCard.getBoundingClientRect().top;

    actualCard.classList.add("dragged");

    const onMouseOver = (e) => {
      actualCard.style.top = e.pageY - shiftY + "px";
      actualCard.style.left = e.pageX - shiftX + "px";
    };

    const onMouseUp = (e) => {
      const mouseUpCard = e.target;

      if (
        mouseUpCard.parentElement !== null &&
        mouseUpCard.parentElement.classList.contains("cards")
      ) {
        if (e.offsetY < mouseUpCard.getBoundingClientRect().height / 2) {
          mouseUpCard.parentElement.insertBefore(actualCard, mouseUpCard);
        } else {
          mouseUpCard.parentElement.insertBefore(
            actualCard,
            mouseUpCard.nextSibling
          );
        }
      }
      if (mouseUpCard.classList.contains("cards")) {
        mouseUpCard.append(actualCard);
      }

      actualCard.classList.remove("dragged");
      actualCard.style.top = 0;
      actualCard.style.left = 0;
      actualCard = undefined;

      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseover", onMouseOver);

      let container = document.querySelector(".container");
      localStorage.setItem("container", container.innerHTML);
    };

    document.documentElement.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseover", onMouseOver);
  });
}
