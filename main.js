
document.getElementsByClassName('options')[0].classList.add('selection');
document.getElementsByClassName('time-controls')[0].style.display = 'block';


// SHOW AND CLOSE SETTINGS PANEL
function settingsToggle(){
    let settings_panel = document.getElementById('settings_panel');
    let status = settings_panel.style.display;
    settings_panel.style.display = status == 'none'? 'block' : 'none';
}
document.getElementById('show_settings').onclick = settingsToggle;
document.getElementById('close').onclick = settingsToggle;



// SELECT THEME COLOR
let theme_color;
function selectColor(event){

    document.querySelectorAll(".fontimg").forEach(image => {image.src = ' '});
    event.target.childNodes[0].src = "./images/check-mark.svg";
    let eventid = event.target.id;

    if(eventid == 'color1'){
        theme_color = '#F87070';
    } else if(eventid == 'color2') {
        theme_color = '#70F3F8';
    } else{
        theme_color = '#D881F3';
    }
}
document.querySelectorAll('.color-selectors').forEach(control => {control.addEventListener('click', selectColor)})


// SELECT THEME FONT-FAMILY
let theme_font;
function selectFontfamily(event){

    theme_font = event.target.id;
    let fontfam = document.getElementsByClassName("fonthover");

    for (let i = 0; i < fontfam.length; i++) {
        fontfam[i].style.color = "gray";
        fontfam[i].style.backgroundColor = "#D7E0FF";
      }
    event.target.style.backgroundColor = 'black';
    event.target.style.color = 'white';
}
document.querySelectorAll('.fonthover').forEach(control => {control.addEventListener('click', selectFontfamily)})



// APPLY SELECTED FONT AND COLOR
function applySelectedColor(){
    let newcolor = theme_color ? theme_color : '#F87070';
    let root_variable = document.querySelector(':root');
    root_variable.style.setProperty('--theme', newcolor);
}
function applySelectedFont(){
    let newfont = theme_font ? theme_font : 'Helvetica'
    let root_font = document.querySelector(':root');
    root_font.style.setProperty('--fontfam', newfont);
}
document.getElementById('apply').addEventListener('click', applySelectedColor);
document.getElementById('apply').addEventListener('click', applySelectedFont);



//SETTINGS : INCREASE / DECREASE POMODORO / BREAK LENGTH
function increaseTime(event) {
    let pomodoro = event.target.parentNode.previousSibling.previousSibling;
    let pvalue = pomodoro.innerHTML;
    pvalue = parseInt(pvalue) + 1;
    pomodoro.innerHTML = pvalue;
}

function decreaseTime(event) {
    let pomodoro = event.target.parentNode.previousSibling.previousSibling;
    let pvalue = pomodoro.innerHTML;
    pvalue = parseInt(pvalue);
    pvalue = pvalue > 0 ? pvalue -1 : 0;
    pomodoro.innerHTML = pvalue;
}
document.querySelectorAll('.up').forEach(control => {control.addEventListener('click', increaseTime)})
document.querySelectorAll('.down').forEach(control => {control.addEventListener('click', decreaseTime)})


// UPDATE MODE LENGTH SETTINGS
let pomodoroOrBreak = [25,5,15];
function timeLengths (){
    let values = document.getElementsByTagName('h3');
    for (let i = 0; i < values.length; i++) {
        pomodoroOrBreak[i] = parseInt(values[i].innerHTML);   
   }
}
document.getElementById('apply').addEventListener('click', timeLengths);



// SELECT POMODORO OR SHORT-BREAK OR LONG-BREK
function pomoSbreakLbreak(event) {

    let options = document.querySelectorAll('.options');
    options.forEach(option => {option.classList.remove('selection')});
    event.target.classList.add('selection');
    document.getElementById('timer-progress').style.backgroundImage = 'conic-gradient(#161932 0deg, #161932 0deg, #161932 0deg)';

    let controls = document.getElementsByClassName('time-controls');
    for (let i=0; i<controls.length; i++){
        controls[i].style.display = 'none';
    }
    controls[0].style.display = 'block';
    document.getElementsByTagName('h1')[2].innerHTML= '00';
       
    let targetMode = event.target.innerHTML;
    let h1 = document.getElementsByTagName('h1')[0];
        if (targetMode == 'pomodoro'){
            h1.innerHTML = pomodoroOrBreak[0].toString().length == 1? '0'+ pomodoroOrBreak[0] : pomodoroOrBreak[0];
        } else if (targetMode == 'short break') {
            h1.innerHTML = pomodoroOrBreak[1].toString().length == 1? '0'+ pomodoroOrBreak[1] : pomodoroOrBreak[1];
        } else {
            h1.innerHTML = pomodoroOrBreak[2].toString().length == 1? '0'+ pomodoroOrBreak[2] : pomodoroOrBreak[2];;
        }
    }



//RESTART SELECTED MODE
function update_selected_mode() {
    let values = document.getElementsByTagName('h3');
    let modes = document.querySelectorAll('.options');
    for (let i=0; i<values.length;i++){
        if(modes[i].classList.contains('selection')){
            let update = values[i].innerHTML;
            document.getElementsByTagName('h1')[0].innerHTML = update.length == 1? '0' + update : update;
        }
    }
}
document.getElementById('apply').addEventListener('click', update_selected_mode);
document.getElementById('restart-button').addEventListener('click', update_selected_mode);
document.querySelectorAll('.options').forEach(option => {option.addEventListener('click', pomoSbreakLbreak)});



// RUM TIMER
function run_mode() {
    
    const stop_start_timer = inner_run_mode();
    document.getElementById('pause-button').addEventListener('click', stop_start_timer);
    document.querySelectorAll('.options').forEach(option => {option.removeEventListener('click', pomoSbreakLbreak)});

function inner_run_mode(){

    let secondV = setInterval(run_mode_s, 1000);

function run_mode_m(){
    let minute = document.getElementsByTagName('h1')[0];
    let initialValue = minute.innerHTML;
    initialValue = parseInt(initialValue) - 1;
    let numtext = initialValue.toString();
    if(numtext.length == 1){
        minute.innerHTML = '0' + initialValue;
        if(minute.innerHTML == '00'){
          document.querySelectorAll('.time-controls').forEach(control => {control.style.display = 'none'});
          document.getElementById('restart-button').style.display = 'block';
          document.querySelectorAll('.options').forEach(option => {option.addEventListener('click', pomoSbreakLbreak)});
          stop_start_timer();
        }
    } else{
      minute.innerHTML = initialValue;
    } 
}

function run_mode_s(){
    let seconds = document.getElementsByTagName('h1')[2];
    let initialValue = seconds.innerHTML;
    initialValue = parseInt(initialValue);
    
    if (initialValue == 0){
        seconds.innerHTML = 59;
    } else{
        initialValue = initialValue -1;
        let numtext = initialValue.toString();
        if(numtext.length == 1){
            seconds.innerHTML = '0' + initialValue;
            if(seconds.innerHTML == '00'){
                run_mode_m();
            }
        }else{
            seconds.innerHTML = initialValue ;
        }
    }
}
return function () {
    (function (){clearInterval(secondV)})();
    }
  }
}
document.getElementById('start-button').addEventListener('click', run_mode);
document.getElementById('restart-button').addEventListener('click', run_mode);



//TIMER CONTROLS (START, PAUSE, RESTART)
function timer_controls(event){
    let controls = document.getElementsByClassName('time-controls');
    for (let i=0; i<controls.length; i++){
        controls[i].style.display = 'none';
    }

    if (event.target.innerHTML == 'START'){
        event.target.nextSibling.nextSibling.style.display = 'block';
    } else{
        event.target.previousSibling.previousSibling.style.display = 'block';
    }
}
document.querySelectorAll('.time-controls').forEach(control => {control.addEventListener('click', timer_controls)});



//CIRCULAR PROGRESS BAR
(function(){
    let stop_angle = 0;
    function progress(){
        let progress_bar = inner_progress();
        let progress_stop = setInterval(progress_bar,1000)

        function stop_progress_bar(){
            clearInterval(progress_stop)
        }
        document.getElementById('pause-button').addEventListener('click', stop_progress_bar);

        function inner_progress(){
            let values = document.getElementsByTagName('h3');
            let modes = document.querySelectorAll('.options');
            let progress_element = document.getElementById('timer-progress');

           let progress_minute = 0;
           for (let i=0; i<values.length;i++){
            if(modes[i].classList.contains('selection')){
                progress_minute = values[i].innerHTML;
                }
           }

            let progress_angle = 360 / (parseInt(progress_minute) * 60);
            if (stop_angle == 0) {
                stop_angle = progress_angle;
            } else{
                stop_angle = stop_angle;
            };

             return function() {
             console.log(stop_angle);
             let colorA = getComputedStyle(document.documentElement).getPropertyValue('--theme');
             let colorB = '#161932';
             let angleB = stop_angle;
             let conic_gradient = `conic-gradient(${colorA} 0deg, ${colorA} ${angleB}deg, ${colorB} 0deg)`;
             progress_element.style.backgroundImage = conic_gradient;
             stop_angle = stop_angle + progress_angle;
             if (stop_angle > 360){
                stop_angle = 0;
                clearInterval(progress_stop)
                 }
            } 

         }
    };
    document.getElementById('start-button').addEventListener('click', progress);
    document.getElementById('restart-button').addEventListener('click', progress);

})();



