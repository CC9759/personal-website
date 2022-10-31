const headerTemplate = document.createElement('template')

headerTemplate.innerHTML = `
<header id="nav-header">
    <img id="profile" src="./images/tangerineCtransparent.png" alt="Tangerine Profile">
    <a href="index.html" style="text-decoration: none" class="button">Welcome</button></a>
    <a href="aboutMe.html" style="text-decoration: none" class="button">About Me</button></a>
    <a href="projects.html" style="text-decoration: none" class="button">Projects</button></a>
</header>
<style>
a, a:hover, a:visited, a:active {
    color: inherit;
    text-decoration: none;
}

#profile {
    display: flex;
    object-fit: fill;
    width: auto;
    height: 20%;
    margin-top: 10%;
    margin-bottom: 10%;
}

header {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: auto;
    height: 100vh;
    background-color: var(--header-color);
    font-family: var(--default-font);
    color: var(--default-header-color);
    font-size: x-large;
    font-weight: bold; 
}

header a {
    margin: 20%;
    flex-grow: 2;
}
</style>
`; 

class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback(){
        const shadowRoot = this.attachShadow({mode: 'closed'})
        shadowRoot.appendChild(headerTemplate.content)
    }
}

customElements.define('header-component', Header)