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
        this.innerHTML =
            `
			    <div class="sides">
			        <div class=" container-fluid ">
			            <div class="left-side">
			                <div class="side-content">
			                    <a href="#"> Instagram </a>
			                </div>
			            </div>

			            <div class="right-side">
			                <div class="side-content">
			                    <p class="copyright">
			                        © 2023 WNDH - All rights reserved </p>
			                </div>
			            </div>
			        </div>
			    </div> 
			    <!-- sides -->

    `

    }
}

customElements.define('main-sides', Sides);
customElements.define('main-header', NavMenu);