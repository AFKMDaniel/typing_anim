const screen = document.querySelector('.screen');
const screenSpan = document.querySelector('.screen span');

//-------------------------------------------------
// В переменную ниже поместите нужный текст
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repellendus tempora quia facere aliquam inventore provident enim cum distinctio sunt ullam, ipsam voluptatibus dicta repellat tenetur minus ab ea commodi fugit quisquam at corporis exercitationem, dolorem rerum. Quia dolorem saepe modi, quam harum soluta maiores adipisci nobis ullam sint id, assumenda repellat ea? Perspiciatis corporis voluptatum optio, blanditiis, porro reiciendis omnis temporibus neque esse nulla ducimus, inventore saepe. Doloremque nesciunt praesentium consequatur quos est ex odit eum laudantium nisi illum maxime, nobis fugiat, architecto id exercitationem vel autem voluptates, dolorum omnis! Repellendus culpa voluptate iusto rem sed? Ipsa omnis, rerum excepturi ut dolores non cumque reiciendis sapiente nam aperiam architecto provident a error voluptas labore consequatur. Quaerat at consequuntur alias?';
const typingSpeed = 0.025; // время появления одного символа в секундах
const needToClear = true; // нужно ли очищать экран
const clearDelay = 0; // задержка очистки в секундах
//-------------------------------------------------

let allowChangeSteps = false;

document.documentElement.style.setProperty('--blink-anim-delay', (text.length * typingSpeed).toString() + 's');
document.documentElement.style.setProperty('--clear-anim-delay', clearDelay.toString() + 's');

function enterText () {
    return new Promise((res,rej) => {
        for (let i = 1; i <= text.length; i++){
            setTimeout(() => {
                screenSpan.innerHTML += text[i-1];
                if(i === text.length){
                    res('Конец');
                }
            },i * typingSpeed * 1000)
        }
    });
}

function setClearAnimSteps() {
    const stringsCount = screen.clientHeight / 30;
    document.documentElement.style.setProperty('--clear-anim-steps', stringsCount.toString());
}

window.addEventListener('resize', () => {
    if(allowChangeSteps){
        setClearAnimSteps();
    }
});

enterText().then(() => {
    if(needToClear){
        allowChangeSteps = true;
        setClearAnimSteps();
    }
});
