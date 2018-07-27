let linkCss = document.querySelector('#source-css');
let theme = 0
const themeChoice = ["newMain", "themeDebug", "darkTheme", "turingTheme", "retroTheme"];
const switchTheme = (step) => 
{
    theme += step
    if(theme == themeChoice.length) 
    {
        theme = 0
    }
    else if (theme < 0)
    {
        theme = themeChoice.length-1
    }
    linkCss.setAttribute("href", "/css/themes/"+themeChoice[theme]+".css")
    document.getElementById("FirstTheme").innerHTML = themeChoice[theme]
}
document.getElementById("FirstTheme").innerHTML = themeChoice[theme]