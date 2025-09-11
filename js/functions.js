//Nav Menu
class NavMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            ` 
        <header class="atail-header">
            <div class=" container-fluid">
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
                        <li class="menu-item col-xs-2 ">
                            <a href="bulletins.html"><span>Bulletins</span></a>
                        </li>
                        <li class="menu-item  col-xs-2 ">
                            <a href="archive.html"><span>Archive</span></a>
                        </li>
                        <li class="menu-item col-xs-2 ">
                            <a href="bio.html"><span>Bio</span></a>
                        </li>
                        <li class="menu-item col-xs-2">
                            <a href="current.html"><span>Current</span></a>
                        </li>
                        <li class="menu-item col-xs-2 ">
                            <a href="blog.html"><span>Blog</span></a>
                        </li>
                        <li class="menu-item col-xs-2 ">
                            <a href="typography.html"><span>Typography</span></a>
                        </li>
                    </ol>
                </nav>
            </div>
        </header>

		`
    }
}






//Sides
class Sides extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
			    <div class="sides">
			        <div class=" container-fluid ">
			            <div class="left-side">
			                <div class="side-content">
			                    <a href="https://www.instagram.com/worrynoisedirtheat/" target="_blank"> Social </a>
                                <a href="https://worrynoisedirtheat.bandcamp.com/music" target="_blank"> Store </a>
                                <a href="https://fundraising.fracturedatlas.org/worry-noise-dirt-heat" target="_blank"> Support </a>
                                <a href="mailto:support@worrynoisedirtheat@protonmail.com" target="_blank"> Contact </a>
			                </div>
			            </div>

			            <div class="right-side">
			                <div class="side-content">
			                    <p class="copyright">
			                        © 2023 Worry Noise Dirt Heat · <a href="https://gisselasaune.com/"  target="_blank" style="margin-right: 8px;"> Design by Gissela Sauñe</a> · <a href="https://www.alonsoct.dev/" target="_blank"> Custom by Alonso Caballero</a></p>
			                </div>
			            </div>
			        </div>
			    </div> 
			    <!-- sides -->

    `;

    }
}

customElements.define('main-sides', Sides);
customElements.define('main-header', NavMenu);


function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

document.querySelectorAll(".audio-player").forEach((player) => {
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
        if (p !== player) p.querySelector(".play-btn").textContent = "►";
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