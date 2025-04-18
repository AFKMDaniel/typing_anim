const screen = document.querySelector(".screen");
const screenSpan = document.querySelector(".screen span");
const wrapper = document.querySelector(".wrapper");
const text = screenSpan.innerHTML;
screenSpan.innerHTML = "";

//-------------------------------------------------
const typingSpeed = 0.1; // время появления одного символа в секундах
const needToClear = true; // нужно ли очищать экран
const clearDelay = 5; // задержка очистки в секундах
//-------------------------------------------------

let timeoutId;
let currentChar = 0;
let allowScroll;

document.documentElement.style.setProperty(
	"--clear-anim-delay",
	clearDelay.toString() + "s"
);

// function enterText () {
//     timeoutIds = [];
//     document.documentElement.style.setProperty('--clear-anim-steps', '0');
//     document.documentElement.style.setProperty('--blink-anim-time', '0s');
//     screenSpan.offsetHeight;
//     screenSpan.innerHTML = '';
//     for (let i = 1; i <= text.length; i++){
//         const timeoutId = setTimeout(() => {

//             if(i === 25) {
//                 allowScroll = true;
//             }

//             if(allowScroll){
//                 wrapper.scrollTop = wrapper.scrollHeight;
//             }

//             screenSpan.innerHTML += text[i-1];

//             if(i === text.length){
//                 document.documentElement.style.setProperty('--blink-anim-time', '1s');
//                 if(needToClear){
//                     const stringsCount = screen.clientHeight / 30;
//                     document.documentElement.style.setProperty('--clear-anim-steps', stringsCount.toString());
//                     const timeoutId = setTimeout(enterText,(clearDelay + stringsCount) * 1000);
//                     timeoutIds.push(timeoutId);
//                 }
//             }
//         },i * typingSpeed * 1000)
//         timeoutIds.push(timeoutId);
//     }
// };

function enterText() {
	timeoutId = setTimeout(() => {
		if (currentChar === 24) {
			allowScroll = true;
		}
		screenSpan.innerHTML += text[currentChar];
		if (allowScroll) {
			wrapper.scrollTop = wrapper.scrollHeight;
		}
		currentChar++;
		if (currentChar < text.length) {
			enterText();
		} else {
			document.documentElement.style.setProperty("--blink-anim-time", "1s");
			if (needToClear) {
				const stringsCount = screen.clientHeight / 30;
				document.documentElement.style.setProperty(
					"--clear-anim-steps",
					stringsCount.toString()
				);
				timeoutId = setTimeout(reset, (clearDelay + stringsCount) * 1000);
			}
		}
	}, typingSpeed * 1000);
}

function reset() {
	currentChar = 0;
	screenSpan.innerHTML = "";
	document.documentElement.style.setProperty("--clear-anim-steps", "0");
	document.documentElement.style.setProperty("--blink-anim-time", "0s");
	enterText();
}

window.addEventListener("resize", () => {
	clearTimeout(timeoutId);
	reset();
});

wrapper.addEventListener("scroll", () => {
	allowScroll = false;
});

enterText();
