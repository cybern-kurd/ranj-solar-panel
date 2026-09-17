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
