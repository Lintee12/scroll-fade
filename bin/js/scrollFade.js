//1. put script at the bottom of the body tag.
//2. add the "scroll-fade" class to any element you want to fade.
const fadeTime = 1000; // time it takes for the element to become fully visible
const fadeDelay = 25; // delay before next element can fade
const fadeDistance = 1.25; // distance the element needs to be on screen to fade (window.innerHeight / revealDistance)
const ease = true; // ease in the fade

let scrollFadeElements = [];

window.onload = () => {
    scrollFadeElements = document.querySelectorAll('.scroll-fade');
    scrollFadeElements.forEach(el => {
        el.style.opacity = 0;
        el.dataset.didFade = "false"
    })
    checkElements();
}

document.addEventListener('scroll', () => {
    checkElements();
})

function getOffset( el ) {
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: y, left: x };
}

function checkElements() {
    scrollFadeElements.forEach((el, index) => {
        if((window.scrollY + window.innerHeight / fadeDistance) >= getOffset(el).top && el.dataset.didFade === "false") {
            el.dataset.didFade = "true";
            el.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: fadeTime,
                fill: "forwards",
                easing: ease ? "ease-out" : "linear",
                delay: index * fadeDelay
            })
        }
    })
}
