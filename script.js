const buttons = document.querySelectorAll(".lang");
const translatable = document.querySelectorAll("[data-ku]");
const saved = localStorage.getItem("ranj-lang") || "ku";

function setLanguage(lang){
  translatable.forEach(el => {
    const value = el.dataset[lang];
    if(value) el.textContent = value;
  });
  document.documentElement.lang = lang === "ku" ? "ku" : lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  localStorage.setItem("ranj-lang", lang);
}
buttons.forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
setLanguage(saved);
document.getElementById("year").textContent = new Date().getFullYear();


/* =========================
   PROJECT GALLERY LIGHTBOX
========================= */

const galleryCards = [...document.querySelectorAll(".gallery-card")];
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentGalleryIndex = 0;

function currentLang() {
  return document.documentElement.lang === "en" ? "en" :
         document.documentElement.lang === "ar" ? "ar" : "ku";
}

function updateLightbox() {
  const card = galleryCards[currentGalleryIndex];
  const lang = currentLang();

  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector("img").alt;
  lightboxCaption.textContent =
    card.dataset["title-" + lang] || card.dataset["title-ku"] || "";
}

function openGallery(index) {
  currentGalleryIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveGallery(step) {
  currentGalleryIndex =
    (currentGalleryIndex + step + galleryCards.length) % galleryCards.length;
  updateLightbox();
}

galleryCards.forEach((card, index) => {
  card.addEventListener("click", () => openGallery(index));
});

lightboxClose.addEventListener("click", closeGallery);
lightboxPrev.addEventListener("click", () => moveGallery(-1));
lightboxNext.addEventListener("click", () => moveGallery(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeGallery();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

/* Keep the lightbox caption in the selected language. */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (lightbox.classList.contains("open")) updateLightbox();
  });
});
