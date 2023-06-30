export class Widget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return localStorage.getItem("container")
      ? localStorage.getItem("container")
      : `
      <div class="column">
        <div class="column-content">
          <div class="header">TODO</div>
          <div class="cards"></div>
          <a href="" class="add-card-link">+ Add another card</a>
        </div>
      </div>
      <div class="column">
        <div class="column-content">
          <div class="header">IN PROGRESS</div>
          <div class="cards"></div>
          <a href="" class="add-card-link">+ Add another card</a>
        </div>
      </div>
      <div class="column">
        <div class="column-content">
          <div class="header">DONE</div>
          <div class="cards"></div>
          <a href="" class="add-card-link">+ Add another card</a>
        </div>
      </div>
      `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = Widget.markup;
    this.addCardLinks = this.parentEl.querySelectorAll(".add-card-link");

    for (let addCardLink of this.addCardLinks) {
      addCardLink.addEventListener("click", this.addCard);
    }

    this.cardRemovers = this.parentEl.querySelectorAll(".card-remove");
    for (let cardRemover of this.cardRemovers) {
      cardRemover.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        const container = document.querySelector(".container");
        localStorage.setItem("container", container.innerHTML);
      });
    }
  }

  addCard(e) {
    e.preventDefault();

    const addCardLink = e.target;
    addCardLink.classList.add("hidden");

    const addCardForm = document.createElement("form");

    addCardForm.innerHTML = `
        <textarea placeholder="Enter a task"></textarea>
        <button class="add-card-btn" type="submit">Add Card</button>
    `;

    e.target.parentElement.append(addCardForm);

    const textarea = addCardForm.querySelector("textarea");

    addCardForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let container = document.querySelector(".container");
      const card = document.createElement("div");
      card.classList.add("card");
      card.textContent = textarea.value;
      e.target.parentElement.querySelector(".cards").append(card);

      const cardRemove = document.createElement("div");
      cardRemove.classList.add("card-remove", "hidden");
      card.append(cardRemove);
      cardRemove.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        localStorage.setItem("container", container.innerHTML);
      });

      addCardForm.remove();
      addCardLink.classList.remove("hidden");
      localStorage.setItem("container", container.innerHTML);
    });
  }
}
