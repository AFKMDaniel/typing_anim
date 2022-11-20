function reflow() {
    const screen = document.querySelector('.screen');
    const clone = screen.cloneNode(true);
    screen.parentNode.replaceChild(clone,screen);
}

// Время интервала должно быть равно (9 + задержка анимации clearScreen) * 1000
setInterval(reflow, (9 + 66) * 1000)