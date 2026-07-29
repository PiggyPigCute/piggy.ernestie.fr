let families = [];

const cardsEl = document.getElementById("cards");
const overlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalItems = document.getElementById("modal-items");
const modalClose = document.getElementById("modal-close");
const discordBtn = document.getElementById("discord-btn");
const toast = document.getElementById("toast");

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
  modalItems.innerHTML = family.items.map(renderItem).join("");
  overlay.classList.add("is-open");
  modalClose.focus();
}

function renderItem(item){
  const mainImg = item.mainImg
    ? `<img class="modal-item-main" src="imgs/${item.mainImg}" alt="">`
    : "";
  const links = (item.links || []).length
    ? `<div class="modal-item-links">${item.links.map(link => `
        <a class="modal-item-link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>
      `).join("")}</div>`
    : "";
  const imgs = (item.imgs || []).length
    ? `<div class="modal-item-imgs">${item.imgs.map(img => `
        <img src="imgs/${img}" alt="">
      `).join("")}</div>`
    : "";
  return `
    <div class="modal-item">
      ${mainImg}
      <div class="modal-item-body">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        ${imgs}
        ${links}
      </div>
    </div>
  `;
}

function closeModal(){
  overlay.classList.remove("is-open");
}

let toastTimeout;
function showToast(text){
  toast.textContent = text;
  toast.classList.add("is-visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

discordBtn.addEventListener("click", () => {
  navigator.clipboard.writeText("@piggypig").then(() => {
    showToast("@piggypig copié dans le presse-papier");
  });
});

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
