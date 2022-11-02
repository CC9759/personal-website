const headerTemplate = document.createElement('template')

headerTemplate.innerHTML = `
<header id="nav-header">
    <img id="profile" src="./images/tangerineCtransparent.png" alt="Tangerine Profile" onclick="lightMode()">
    <a href="index.html" style="text-decoration: none" class="button">Welcome</a>
    <a href="aboutMe.html" style="text-decoration: none" class="button">About Me</a>
    <a href="projects.html" style="text-decoration: none" class="button">Projects</a>
    <a href="checkSplitter.html" id="secret"></a>
    </header>
<style>
a, a:hover, a:visited, a:active {
    color: inherit;
    text-decoration: none;
}

#profile {
    display: flex;
    object-fit: fill;
    width: 10em;
    height: auto;
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
}

#secret {
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: var(--default-header-color);
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