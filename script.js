const PLACEHOLDER_IMG = "imgs/couro.jpg";
const PLACEHOLDER_TEXT = "Description à venir.";

let families = [];

const cardsEl = document.getElementById("cards");
const overlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalItems = document.getElementById("modal-items");
const modalClose = document.getElementById("modal-close");

function renderCards(){
  families.forEach((family, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.innerHTML = `
      <div class="card-body">
        <div class="card-photos">
          <div class="photo"><img src="imgs/${family.imgs[0]}" alt=""></div>
          <div class="photo"><img src="imgs/${family.imgs[1]}" alt=""></div>
          <div class="photo"><img src="imgs/${family.imgs[2]}" alt=""></div>
        </div>
        <h2>${family.title}</h2>
        <p>${family.desc}</p>
        <span class="card-cta">Découvrir <span class="card-cta-arrow">→</span></span>
      </div>
    `;
    card.addEventListener("click", () => openModal(index));
    cardsEl.appendChild(card);
  });
}

function openModal(index){
  const family = families[index];
  modalTitle.textContent = family.title;
  modalDesc.textContent = family.desc;
  modalItems.innerHTML = family.items.map(item => `
    <div class="modal-item">
      <img src="${PLACEHOLDER_IMG}" alt="">
      <div class="modal-item-body">
        <h3>${item}</h3>
        <p>${PLACEHOLDER_TEXT}</p>
      </div>
    </div>
  `).join("");
  overlay.classList.add("is-open");
  modalClose.focus();
}

function closeModal(){
  overlay.classList.remove("is-open");
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

fetch("families.json")
  .then(res => res.json())
  .then(data => {
    families = data;
    renderCards();
  });
