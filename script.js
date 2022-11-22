const screen = document.querySelector('.screen');
const screenSpan = document.querySelector('.screen span');
const wrapper = document.querySelector('.wrapper');
const text = screenSpan.innerHTML;

//-------------------------------------------------
const typingSpeed = 0.075; // время появления одного символа в секундах
const needToClear = true; // нужно ли очищать экран
const clearDelay = 5; // задержка очистки в секундах
//-------------------------------------------------

let timeoutIds;
let allowScroll;

document.documentElement.style.setProperty('--blink-anim-delay', (text.length * typingSpeed).toString() + 's');
document.documentElement.style.setProperty('--clear-anim-delay', (clearDelay).toString() + 's');

function enterText () {
    timeoutIds = [];
    document.documentElement.style.setProperty('--clear-anim-steps', '0');
    screenSpan.innerHTML = '';
    for (let i = 1; i <= text.length; i++){
        const timeoutId = setTimeout(() => {
            
            if(i === 25) {
                allowScroll = true;
            }


            if(allowScroll){
                wrapper.scrollTop = wrapper.scrollHeight;
            }

            screenSpan.innerHTML += text[i-1];

            if(i === text.length){
                if(needToClear){
                    const stringsCount = screen.clientHeight / 30;
                    document.documentElement.style.setProperty('--clear-anim-steps', stringsCount.toString());
                    const timeoutId = setTimeout(enterText,(clearDelay + stringsCount) * 1000);
                    timeoutIds.push(timeoutId);
                }
            }
        },i * typingSpeed * 1000)
        timeoutIds.push(timeoutId);
    }
};

window.addEventListener('resize', () => {
    timeoutIds.forEach((id) => {
        clearTimeout(id);
    })
    enterText();
});

wrapper.addEventListener('scroll', () => {
    allowScroll = false;
})

enterText();

