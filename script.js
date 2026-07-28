const PLACEHOLDER_IMG = "imgs/couro.jpg";
const PLACEHOLDER_TEXT = "Description à venir.";

const families = [
  {
    title: "Idéolangues",
    desc: PLACEHOLDER_TEXT,
    items: ["Vivianus", "Dibi", "Vikof", "Ernestien", "Kétonien", "Lachvabio", "Codatix", "Hyblien"],
  },
  {
    title: "Micronations",
    desc: PLACEHOLDER_TEXT,
    items: ["Ernestie", "Dibistan", "Kétonie", "Goatopia", "Espradal", "Nesquacie"],
  },
  {
    title: "Web",
    desc: PLACEHOLDER_TEXT,
    items: ["ernestie.fr", "dico.ernestie.fr", "portail.ernestie.fr (à faire)", "piggy.ernestie.fr", "crack.ernestie.fr", "Kal'n'dar"],
  },
  {
    title: "Dessin vectoriel",
    desc: PLACEHOLDER_TEXT,
    items: ["Elek'atlom Kétonska", "Logo ASRD", "Logo Goat FC", "Logo La Défense", "Logo COCO", "Logo Olympique Chrûk"],
  },
  {
    title: "Fablab enthousiast",
    desc: PLACEHOLDER_TEXT,
    items: ["Trophée CdM (ft. Papa, Alice)", "Médailles CdM", "Photo pour papa", "Loup Garou", "Horloge", "Sapins"],
  },
  {
    title: "Python",
    desc: PLACEHOLDER_TEXT,
    items: ["Librairies Python"],
  },
  {
    title: "Serveurs Discord",
    desc: PLACEHOLDER_TEXT,
    items: ["Ernestomôch", "Microballs", "IdeoBipBup"],
  },
  {
    title: "Esolangs",
    desc: PLACEHOLDER_TEXT,
    items: ["Blip", "Linecode", "Falldown"],
  },
];

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
      <div class="card-images">
        <img src="${PLACEHOLDER_IMG}" alt="">
        <img src="${PLACEHOLDER_IMG}" alt="">
        <img src="${PLACEHOLDER_IMG}" alt="">
      </div>
      <div class="card-body">
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

renderCards();
