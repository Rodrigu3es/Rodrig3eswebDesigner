// ✅ TROQUE AQUI PELO SEU NÚMERO (DDD + número), só números, sem espaços e sem "+"
const WHATS_NUMBER = "5531900000000"; // Ex: 5531999999999

const DEFAULT_MSG = "Olá! Quero um site profissional para meu negócio. Pode me passar um orçamento?";

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATS_NUMBER}?text=${text}`;
}

function setHref(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = waLink(message || DEFAULT_MSG);
  el.target = "_blank";
  el.rel = "noopener";
}

function toggleMobileMenu() {
  const mobile = document.getElementById("mobile");
  const hamb = document.getElementById("hamb");
  const isHidden = mobile.hasAttribute("hidden");

  if (isHidden) {
    mobile.removeAttribute("hidden");
    hamb.setAttribute("aria-expanded", "true");
  } else {
    mobile.setAttribute("hidden", "");
    hamb.setAttribute("aria-expanded", "false");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Ano no rodapé
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // CTAs WhatsApp
  setHref("ctaTop");
  setHref("ctaHero", "Olá! Vi seu site e quero um orçamento para criar um site profissional.");
  setHref("ctaMobile");
  setHref("ctaCard", "Olá! Quero fechar um site profissional. Como funciona?");
  setHref("ctaPlan", "Olá! Quero o plano Mais vendido (R$ 900). Pode me atender?");
  setHref("ctaBottom", "Olá! Quero um site profissional para meu negócio. Pode me passar valores?");
  setHref("waFloat");

  // Menu mobile
  const hamb = document.getElementById("hamb");
  if (hamb) hamb.addEventListener("click", toggleMobileMenu);

  // Fechar menu ao clicar em links
  const mobile = document.getElementById("mobile");
  if (mobile) {
    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobile.setAttribute("hidden", "");
        hamb?.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Formulário -> envia no WhatsApp
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const nome = (data.get("nome") || "").toString().trim();
      const negocio = (data.get("negocio") || "").toString().trim();
      const whats = (data.get("whats") || "").toString().trim();
      const msg = (data.get("msg") || "").toString().trim();

      const message =
`Olá! Quero um orçamento de site.
Nome: ${nome}
Negócio: ${negocio}
WhatsApp: ${whats}
Mensagem: ${msg || "-"}`;

      window.open(waLink(message), "_blank", "noopener");
      form.reset();
    });
  }
});
