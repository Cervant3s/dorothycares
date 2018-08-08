/*
TEXT SCRAMBLE
_______________________________
*/
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({
                from,
                to,
                start,
                end
            });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const linkCss = document.querySelector('#source-css');
const themeSelector = document.querySelector('#theme-selector');
const themeChoice = [
    {
        publicName: "Standard",
        fileName: "standardTheme"
    }, {
        publicName: "Debug",
        fileName: "themeDebug"
    }, {
        publicName: "Night",
        fileName: "darkTheme"
    }, {
        publicName: "Retro",
        fileName: "retroTheme"
    }, {
        publicName: "Legacy",
        fileName: "legacyTheme"
    }];
let themeIndex = 0;
const fx = new TextScramble(themeSelector.querySelector('.theme-selector-title'));
let hoverThemeSelector = false;
let themeListIsVisible = false;
let delayApparition = 50;
let themeLoad, themeUnload;
/**
 * @function switchTheme
 * @description Change for another theme
 * @param {int|string} switchTo If 'int', switch to many theme before or after; if 'string', it must be a theme name
 */
let switchTheme = (switchTo) => {
    /* In standby for now... Wake it up for a next feature !
    if (themeUnload != undefined){
        themeUnload();
    }
    //*/
    if(typeof switchTo == 'number'){
        themeIndex = (themeIndex + switchTo) % themeChoice.length;
        if(themeIndex < 0){
            themeIndex = themeChoice.length - 1;
        }
    }
    else if(typeof switchTo == 'string'){
        for(let i = themeChoice.length - 1; i >= 0; i--){
            if(themeChoice[i].fileName == switchTo){
                if(themeChoice[themeIndex].fileName == switchTo){
                    return; // We stop here to not "change" the theme with the same theme.
                }
                themeIndex = i;
            }
        }
    }

    // Tempory script ! Delete it for a next feature (see other comment above and below)
    if(themeChoice[themeIndex].publicName === "Retro"){
        injectLines(document.querySelector('.dorothy-ball'));
    }
    else{
        removeLines();
    }
    ////////////////////////////////////////////////////////////////////////////////////

    linkCss.setAttribute("href", "/css/"+themeChoice[themeIndex].fileName +".css");
    /* In standby for now... Wake it up for a next feature !
    let themeScript = document.querySelector('#themeScript');
    if(checkIfThemeHaveScript()){
        themeScript.setAttribute("src", "/js/theme/" + themeChoice[themeIndex].fileName + ".js");
        themeScript.onload = ()=>{
            whenSwitchOnThisTheme();
        };
    }

    if (themeLoad != undefined){
        themeLoad();
    }
    //*/

    fx.setText(themeChoice[themeIndex].publicName);
};

let checkIfThemeHaveScript = ()=>{
    var http = new XMLHttpRequest();
    http.open('HEAD', '/js/theme/' + themeChoice[themeIndex].fileName + '.js', false);
    http.send();
    return http.status != 404;
};
/**
 * @function displayThemeController
 * @description Display the theme controller
 */
let displayThemeController = ()=>{
    if(!hoverThemeSelector){
        themeSelector.style.width = '200px';
        themeSelector.style.opacity = '1';
        themeSelector.querySelector('.switch-left').style.opacity = '1';
        themeSelector.querySelector('.switch-right').style.opacity = '1';

        fx.setText(themeChoice[themeIndex].publicName);
        hoverThemeSelector = true;
    }
};
/**
 * @function hideThemeController
 * @description Hide the theme controller
 */
let hideThemeController = (event)=>{
    console.log("- Hide Theme Controller");
    if( !themeListIsVisible){ // We close the list only if the theme list isn't visible...
        let e = event.toElement || event.relatedTarget;
        if(e == this || (e !== null && e.parentNode == this)){
            return;
        }
        if(hoverThemeSelector){
            themeSelector.querySelector('.switch-left').style.opacity = '';
            themeSelector.querySelector('.switch-right').style.opacity = '';
            themeSelector.style.width = '';
            themeSelector.style.opacity = '';
            
            fx.setText("Themes");
            hoverThemeSelector = false;
        }    
    }
    else{ // ... otherwise, we wait to retry to close the controller.
        toggleThemesList(false);
        setTimeout(hideThemeController, delayApparition * themeChoice.length);
    }
};
let toggleThemesList = (forced = undefined)=>{
    console.log("- Toggle list");

    let themeList = themeSelector.querySelector('ul');

    if(themeListIsVisible || (forced !== undefined && forced == false)){
        hideList(themeList);
    }
    else if(!themeListIsVisible || forced == true){
        showList(themeList);
    }
};
let showList = (list) =>{
    console.log("-- Show list");
        list.style.display = 'block';
        
        let itemsList = list.querySelectorAll('li');
        let delay = 0;
        itemsList.forEach( (item) => {
            let currentDelay = delay;
            setTimeout(
                ()=>{
                    console.log(currentDelay);
                    item.style.opacity = '1';
                },
                currentDelay
            );
            delay += delayApparition;
        });

        themeListIsVisible = true;
        
        list.style.display = 'block';
        list.style.opacity = '1';
};
let hideList = (list) =>{
    console.log("-- Hide list");
    let itemsNodeList = list.querySelectorAll('li');
    let itemsList = Array.from(itemsNodeList); // Convert 'NodeList' into 'Array...
    itemsList.reverse(); // ... because we can't reverse NodeList, only Array can be reverse

    let delay = 0;
    itemsList.forEach( (item) => {
        let currentDelay = delay;
        setTimeout(
            ()=>{
                console.log(currentDelay);
                item.style.opacity = '';
            },
            currentDelay
        );
        delay += delayApparition;
    });

    themeListIsVisible = false;
};

let allItemIsHidden = (list) => {
    let itemsList = list.querySelectorAll('li');
    itemsList.forEach( (item) => {
        let opacity = window.getComputedStyle(item, null).getPropertyValue("opacity");
        console.log('-- Computed opacity : ' + opacity);
        if(opacity > 0){
            console.log("--- allItemIsHidden: return false");
            return false;
        }
    });
    console.log("--- allItemIsHidden: return true");
    return true;
};

let injectLines = (element, nbreOfLines = 60) => {
    let linesContainer = document.createElement('div');
    linesContainer.classList.add('lines');

    while(nbreOfLines > 0){
        let line = document.createElement('div');
        line.classList.add('line');
        linesContainer.appendChild(line);
        nbreOfLines--;
    }

    element.appendChild(linesContainer);
};
let removeLines = () => {
    let linesContainer = document.querySelector('.lines');
    if(linesContainer !== null){
        linesContainer.parentNode.removeChild(linesContainer);
    }
};
/**
 * @function themeSelectorSetup
 * @description Setup all requirements for the theme selector.
 */
let themeSelectorSetup = ()=>{
    themeSelector.addEventListener('mouseover', displayThemeController);
    themeSelector.addEventListener('mouseleave', hideThemeController);
    // themeSelector.querySelector('.theme-selector-title').addEventListener('click', toggleThemesList);

    let themeList = themeSelector.querySelector('ul');
    themeChoice.forEach(theme => {
        let listItem = document.createElement('li');
        listItem.innerHTML = "<span>" + theme.publicName + "</span>";
        themeList.appendChild(listItem);
        listItem.addEventListener('click', ()=>{
            switchTheme(theme.fileName);
        });
    });
};
themeSelectorSetup();