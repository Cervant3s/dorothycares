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

let linkCss = document.querySelector('#source-css');
let themeSelector = document.querySelector('#theme-selector');
let themeChoice = ["newMain", "themeDebug", "darkTheme", "turingTheme", "retroTheme"];
let themeIndex = 0;
let fx = new TextScramble(themeSelector.querySelector('.theme-selector-title'));


let switchTheme = (switchTo) => {
    if(typeof switchTo == 'number'){
        themeIndex = (themeIndex + switchTo) % themeChoice.length;
        if(themeIndex < 0){
            themeIndex = themeChoice.length - 1;
        }
    }
    else if(typeof switchTo == 'string'){
        for(let i = themeChoice.length - 1; i >= 0; i--){
            if(themeChoice[i] == switchTo){
                themeIndex = i;
            }
        }
    }

    linkCss.setAttribute("href", "/css/themes/"+themeChoice[themeIndex]+".css");
    document.querySelector('.theme-selector-title').innerHTML = themeChoice[themeIndex];
    fx.setText(themeChoice[themeIndex]);
};

let displayThemeController = ()=>{
    fx.setText(themeChoice[themeIndex]);
};
let hideThemeController = ()=>{
    fx.setText("Themes");
};

themeSelector.addEventListener('mouseover', displayThemeController);
themeSelector.addEventListener('mouseleave', hideThemeController);