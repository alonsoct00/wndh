/* =========================================================
   HEADER COMPONENT
   ========================================================= */
class NavMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="atail-header">
        <div class="container-fluid">
          <div class="logo atail-logo-portrait">
            <a href="index.html">
              <span class="atail-text-logo">
                <img src="images/whdh_logo.svg" alt="WNDH">
              </span>
            </a>
          </div>
          <div class="show-nav">
            <span data-action="show-nav">
              <span>
                <span></span>
                <span></span>
              </span>
            </span>
          </div>
          <nav class="row">
            <div class="grid-bg row">
              <div class="col-md-2"></div>
              <div class="col-md-2"></div>
              <div class="col-md-2"></div>
              <div class="col-md-2"></div>
              <div class="col-md-2"></div>
              <div class="col-md-2"></div>
            </div>
            <ol id="menu-menu-1" class="nav-list">
              <li class="menu-item col-xs-2"><a href="bulletins.html"><span>Bulletins</span></a></li>
              <li class="menu-item col-xs-2"><a href="archive.html"><span>Archive</span></a></li>
              <li class="menu-item col-xs-2"><a href="bio.html"><span>Bio</span></a></li>
              <li class="menu-item col-xs-2"><a href="current.html"><span>Current</span></a></li>
              <li class="menu-item col-xs-2"><a href="blog.html"><span>Blog</span></a></li>
              <li class="menu-item col-xs-2"><a href="typography.html"><span>Typography</span></a></li>
            </ol>
          </nav>
        </div>
      </header>
    `;
  }
}

/* =========================================================
   SIDES COMPONENT
   ========================================================= */
class Sides extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="sides">
        <div class="container-fluid">
          <div class="left-side">
            <div class="side-content">
              <a href="https://www.instagram.com/worrynoisedirtheat/" target="_blank">Social</a>
              <a href="https://worrynoisedirtheat.bandcamp.com/music" target="_blank">Store</a>
              <a href="https://fundraising.fracturedatlas.org/worry-noise-dirt-heat" target="_blank">Support</a>
              <a href="mailto:worrynoisedirtheat@protonmail.com" target="_blank">Contact</a>
            </div>
          </div>
          <div class="right-side">
            <div class="side-content">
              <p class="copyright">
                © 2023 Worry Noise Dirt Heat · 
                <a href="https://gisselasaune.com.mx/" target="_blank" style="margin-right: 8px;">Design by Gissela Sauñe</a> · 
                <a href="https://www.alonsoct.dev/" target="_blank">Custom by Alonso Caballero</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("main-sides", Sides);
customElements.define("main-header", NavMenu);

/* =========================================================
   AUDIO PLAYER
   ========================================================= */
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

document.querySelectorAll(".audio-player").forEach((player) => {
  if (!player.dataset.audio) return; // seguridad

  const audio = new Audio(player.dataset.audio);
  const btn = player.querySelector(".play-btn");
  const current = player.querySelector(".current");
  const duration = player.querySelector(".duration");
  const progress = player.querySelector(".progress");
  const filled = player.querySelector(".progress-filled");

  // Play/Pause
  btn.addEventListener("click", () => {
    if (audio.paused) {
      // Pausar otros audios
      document.querySelectorAll(".audio-player").forEach((p) => {
        if (p !== player) {
          const otherBtn = p.querySelector(".play-btn");
          if (otherBtn) otherBtn.textContent = "►";
        }
      });
      document.querySelectorAll("audio").forEach((a) => a.pause());

      audio.play();
      btn.textContent = "⏸";
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Pausar");
    } else {
      audio.pause();
      btn.textContent = "►";
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Reproducir");
    }
  });

  // Metadata
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  // Progreso
  audio.addEventListener("timeupdate", () => {
    current.textContent = formatTime(audio.currentTime);
    const percent = (audio.currentTime / audio.duration) * 100;
    filled.style.width = `${percent}%`;
    progress.setAttribute("aria-valuenow", Math.round(percent));
  });

  // Click en barra
  progress.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  });

  // Teclado en barra
  progress.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
      const step = audio.duration * 0.05;
      audio.currentTime += e.key === "ArrowRight" ? step : -step;
    }
  });
});

/* =========================================================
   NAVIGATION (HISTORY)
   ========================================================= */
   // Forzar recarga real al usar los botones del navegador
window.addEventListener("pageshow", function (event) {
  // Si la navegación vino del cache del navegador (bfcache)
  if (event.persisted) {
    window.location.reload();
  }
});

// Función para volver atrás en el historial
function goBack() {
  if (document.referrer !== "") {
    window.history.back();

    // Escuchar el cambio de estado una sola vez y recargar
    window.addEventListener(
      "popstate",
      () => location.reload(),
      { once: true }
    );
  } else {
    // Si no hay historial (ej. entraste directo), redirige a una página por defecto
    window.location.href = "/";
  }
}

// Función para ir adelante en el historial
function goForward() {
  window.history.forward();

  // Escuchar el cambio de estado una sola vez y recargar
  window.addEventListener(
    "popstate",
    () => location.reload(),
    { once: true }
  );
}

// Exponer funciones en el objeto global para usarlas en HTML
window.goBack = goBack;
window.goForward = goForward;


