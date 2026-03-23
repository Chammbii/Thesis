


// function
function speakSlow(text){

  const parts = text.split(',');

  parts.forEach((part, index) => {
    setTimeout(() => {
      const speech = new SpeechSynthesisUtterance(part);
      speech.rate = 0.100;
      speech.pitch = 2.2;
      window.speechSynthesis.speak(speech);
    }, index * 6500); // delay between chunks
  });

}
function openLesson(name){

speak("Let's learn " + name);

}

/*quiz function */
function startQuiz(){

document.getElementById("quizBoard").style.display="block";

speak("Let's start the quiz");

currentTopic = topics[Math.floor(Math.random()*topics.length)];

questionIndex = 0;

loadQuestion();

}

//play button function
function startPlaytime(){
  console.log("Playtime started!");

  // Example: hide menu, show play screen
  document.getElementById("menuScreen").style.display = "none";
  document.getElementById("playScreen").style.display = "block";

  // Optional: speak
  speak("Let's play!");
} 

// open techer
function openTeacherLogin(){

document.getElementById("teacherOverlay").style.display="flex";

}

function closeTeacherLogin(){

document.getElementById("teacherOverlay").style.display="none";

}

function showRegister(){

document.getElementById("loginForm").style.display="none";
document.getElementById("registerForm").style.display="block";

}

function showLogin(){

document.getElementById("registerForm").style.display="none";
document.getElementById("loginForm").style.display="block";

}

function registerTeacher(){

let email = document.getElementById("regEmail").value.trim();
let password = document.getElementById("regPassword").value.trim();
let repeat = document.getElementById("repeatPassword").value.trim();

let pattern = /^(?=.*[A-Z])(?=.*[0-9]).+$/;

if(email === "" || password === ""){
alert("Enter email and password");
return;
}

if(!pattern.test(password)){
alert("Password must contain uppercase letter and number");
return;
}

if(password !== repeat){
alert("Passwords do not match");
return;
}

localStorage.setItem("teacherEmail", email);
localStorage.setItem("teacherPassword", password);

alert("Teacher account created");

showLogin();

}

function loginTeacher(){
let email = document.getElementById("loginEmail").value.trim();
let password = document.getElementById("loginPassword").value.trim();
let savedEmail = localStorage.getItem("teacherEmail");
let savedPassword = localStorage.getItem("teacherPassword");

if(email === "" || password === ""){
alert("Enter email and password");
return;
}

if(savedEmail === null){
alert("No teacher account registered yet");
return;
}

if(email === savedEmail && password === savedPassword){

alert("Login successful");
closeTeacherLogin();

}else{

alert("Incorrect email or password");

}
}


// settingpanel
// SETTINGS STATE (GLOBAL)
let settingsState = {
  music: true,
  sound: true,
  fullscreen: false
};

// OPEN / CLOSE
function openSettings(){
  document.getElementById("settingsPanel").style.display = "block";
}

function closeSettings(){
  document.getElementById("settingsPanel").style.display = "none";
}

function continueGame(){
  closeSettings();
}

// MUSIC
function toggleMusic(){
  let btn = document.getElementById("musicBtn");

  settingsState.music = !settingsState.music;

  if(settingsState.music){
    bgMusic.play();
    btn.innerText = "ON";
    btn.classList.add("on");
    btn.classList.remove("off");
  }else{
    bgMusic.pause();
    btn.innerText = "OFF";
    btn.classList.add("off");
    btn.classList.remove("on");
  }
}

// SOUND
function toggleSound(){
  let btn = document.getElementById("soundBtn");

  settingsState.sound = !settingsState.sound;

  btn.innerText = settingsState.sound ? "ON" : "OFF";
  btn.classList.toggle("on");
  btn.classList.toggle("off");
}

// FULLSCREEN
function toggleFullscreen(){
  let btn = document.getElementById("fullscreenBtn");

  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen();
    btn.innerText = "ON";
  }else{
    document.exitFullscreen();
    btn.innerText = "OFF";
  }
}

// popsound
document.addEventListener("click", function(e){

  const sound = document.getElementById("popSound");

  // 🔊 play only if enabled
  if(settingsState.sound){
    sound.currentTime = 0;
    sound.play();
  }


  // ✨ pop effect ALWAYS
  const pop = document.createElement("div");
  pop.className = "clickPop";

  pop.style.left = e.clientX + "px";
  pop.style.top = e.clientY + "px";

  document.body.appendChild(pop);

  setTimeout(() => {
    pop.remove();
  }, 300);

});

// bakground audio
let bgMusic = document.getElementById("bgMusic");

// play after first click
document.body.addEventListener("click", function(){
    bgMusic.play();
}, { once: true });

// set volume 
bgMusic.volume = 0.5;

// setting panel
// (EASY TO EXPAND)
let settings = {
  volume: 0.5,
  fullscreen: false
};


// OPEN PLAYTIME DASHBOARD
function startPlaytime(){
  document.getElementById("playDashboard").style.display = "block";
  speak("Let's play!");
}

function closePlaytime(){
  document.getElementById("playDashboard").style.display = "none";
}

// START GAME
let currentGame = "";

function startGame(type){
  currentGame = type;

  document.getElementById("playDashboard").style.display = "none";
  document.getElementById("playGame").style.display = "block";

  generateGame();
}

// CLOSE GAME
function closeGame(){
  document.getElementById("playGame").style.display = "none";
}

function generateGame(){

  let question = "";
  let choices = [];
  let correct = "";

  function getChoices(fullList, correctItem, totalChoices = 4){
  let choices = [correctItem];

  let filtered = fullList.filter(item => {
    if(typeof item === "object"){
      return item.name !== correctItem.name;
    }
    return item !== correctItem;
  });

  shuffle(filtered);

  while(choices.length < totalChoices){
    choices.push(filtered.pop());
  }

  return shuffle(choices);
}

  // COLOR GAME (10 colors)
  if(currentGame === "color"){
    let colors = [
      {name:"Red", value:"red"},
      {name:"Blue", value:"blue"},
      {name:"Green", value:"green"},
      {name:"Yellow", value:"yellow"},
      {name:"Orange", value:"orange"},
      {name:"Purple", value:"purple"},
      {name:"Pink", value:"pink"},
      {name:"Brown", value:"brown"},
      {name:"Black", value:"black"},
      {name:"Gray", value:"gray"}
    ];

    correct = colors[Math.floor(Math.random()*colors.length)];
    question = " Tap the color: " + correct.name;

    choices = getChoices(colors, correct);
  }

  // NUMBER GAME (1–10)
  if(currentGame === "number"){
    let numbers = ["1","2","3","4","5","6","7","8","9","10"];

    correct = numbers[Math.floor(Math.random()*numbers.length)];
    question = " Tap the number: " + correct;

    choices = getChoices(numbers, correct);
  }

  //  ALPHABET GAME (A–Z)
  if(currentGame === "alphabet"){
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    correct = letters[Math.floor(Math.random()*letters.length)];
    question = "Tap the letter: " + correct;

   choices = getChoices(letters, correct);
  }

  //  SHAPE GAME (FIXED)
  if(currentGame === "shape"){
    let shapes = [
      {name:"Circle", symbol:"⬤"},
      {name:"Square", symbol:"■"},
      {name:"Triangle", symbol:"▲"},
      {name:"Star", symbol:"⭐"},
      {name:"Heart", symbol:"❤️"},
      {name:"Diamond", symbol:"◆"},
      {name:"Rectangle", symbol:"▬"},
      {name:"Oval", symbol:"⬭"},
      {name:"Pentagon", symbol:"⬟"},
      {name:"Hexagon", symbol:"⬢"}
    ];

    correct = shapes[Math.floor(Math.random()*shapes.length)];
    question = " Tap the shape: " + correct.name;

   choices = getChoices(shapes, correct);
  }

  document.getElementById("gameQuestion").innerText = question;

  let container = document.getElementById("gameChoices");
  container.innerHTML = "";

  choices.forEach(choice => {

    let btn = document.createElement("button");

    // 🎨 COLOR STYLE
    if(currentGame === "color"){
      btn.style.background = choice.value;
      btn.innerText = "";
      btn.style.width = "100px";
      btn.style.height = "100px";
    }

    // 🔺 SHAPE STYLE
    else if(currentGame === "shape"){
      btn.innerText = choice.symbol;
      btn.style.fontSize = "50px";
    }

    else{
      btn.innerText = choice;
    }

    btn.onclick = () => {

      let isCorrect = false;

      if(currentGame === "color"){
        isCorrect = choice.name === correct.name;
      }
      else if(currentGame === "shape"){
        isCorrect = choice.name === correct.name;
      }
      else{
        isCorrect = choice === correct;
      }

      if(isCorrect){
        speak("Wow, you’re so smart!", "You did it!");
        btn.style.background = "lime";
        setTimeout(generateGame, 900);
      }else{
        speak("That’s okay, let’s try again!");
        btn.style.background = "red";
      }

    };

    container.appendChild(btn);
  });

  speak(question);
}

// SHUFFLE FUNCTION
function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}




// quizz
let topics = ["Alphabet","Numbers","Colors","Shapes"];

let quizData = {

Alphabet:[
{q:"What letter comes after A?",a:["B","C","D"],c:"B"},
{q:"What letter comes after B?",a:["C","D","E"],c:"C"},
{q:"What letter comes after C?",a:["D","E","F"],c:"D"},
{q:"What letter comes after D?",a:["E","F","G"],c:"E"},
{q:"What letter comes after E?",a:["F","G","H"],c:"F"}
],

Numbers:[
{q:"What number comes after 1?",a:["2","3","4"],c:"2"},
{q:"What number comes after 2?",a:["3","4","5"],c:"3"},
{q:"What number comes after 3?",a:["4","5","6"],c:"4"},
{q:"What number comes after 4?",a:["5","6","7"],c:"5"},
{q:"What number comes after 5?",a:["6","7","8"],c:"6"}
],

Colors:[
{q:"What color is an apple?",a:["Red","Blue","Green"],c:"Red"},
{q:"What color is the sky?",a:["Blue","Yellow","Red"],c:"Blue"},
{q:"What color is a banana?",a:["Yellow","Purple","Blue"],c:"Yellow"},
{q:"What color is grass?",a:["Green","Black","Pink"],c:"Green"},
{q:"What color is coal?",a:["Black","White","Orange"],c:"Black"}
],

Shapes:[
{q:"Which shape has 3 sides?",a:["Triangle","Circle","Square"],c:"Triangle"},
{q:"Which shape is round?",a:["Circle","Square","Triangle"],c:"Circle"},
{q:"Which shape has 4 equal sides?",a:["Square","Circle","Star"],c:"Square"},
{q:"Which shape looks like a box?",a:["Rectangle","Circle","Triangle"],c:"Rectangle"},
{q:"Which shape has no corners?",a:["Circle","Square","Triangle"],c:"Circle"}
]

};

let currentTopic;
let questionIndex = 0;
let score = 0;

function startQuiz(){

  speak("Let's start the quiz!");

  currentTopic = topics[Math.floor(Math.random()*topics.length)];
  questionIndex = 0;
  score = 0;

  document.getElementById("quizBoard").style.display="block";

  loadQuestion();
}

function loadQuestion(){

  let data = quizData[currentTopic][questionIndex];

  document.getElementById("quizTopic").innerText = currentTopic + " Quiz";
  document.getElementById("questionText").innerText = data.q;

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = ""; // clear old buttons

  data.a.forEach(choice => {
    let btn = document.createElement("button");
    btn.innerText = choice;

    btn.onclick = () => checkAnswer(btn, data.c);

    answersDiv.appendChild(btn);
  });

  document.getElementById("quizProgress").innerText =
    "Question " + (questionIndex+1) + " / " + quizData[currentTopic].length;
}

function checkAnswer(btn, correct){

  if(btn.innerText === correct){

    btn.classList.add("correct");
    speak("Wow, you’re so smart!", "You did it!");
    score++;

    setTimeout(nextQuestion, 800);

  } else {

    btn.classList.add("wrong");
    speak("That’s okay, let’s try again!");

  }
}

function nextQuestion(){
  questionIndex++;

  if(questionIndex >= quizData[currentTopic].length){

    speak("Yay! You finished the quiz! Great job! You got " + score + " correct!");

    setTimeout(closeQuiz, 1500);
    return;
  }

  loadQuestion();
}

function closeQuiz(){
  document.getElementById("quizBoard").style.display="none";
}
// voice setup
// VOICE RECOGNITION SETUP
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if(SpeechRecognition){
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
}

// START LISTENING
function startListening(){

  if(!recognition){
    alert("Speech recognition not supported in this browser");
    return;
  }

  speak("I'm listening...");

  recognition.start();

  recognition.onresult = function(event){

    let spoken = event.results[0][0].transcript.toLowerCase();
    console.log("You said:", spoken);

    matchVoiceAnswer(spoken);
  };

  recognition.onerror = function(){
    speak("I didn't hear you. Try again!");
  };
}
// voice accuracy
function matchVoiceAnswer(spoken){

  let buttons = document.querySelectorAll("#answers button");
  let matched = false;

  buttons.forEach(btn => {

    let answerText = btn.innerText.toLowerCase();

    // SIMPLE MATCH (kid-friendly)
    if(spoken.includes(answerText)){
      matched = true;
      checkAnswer(btn, answerText);
    }
  });

  if(!matched){
    speak("Hmm... try again!");
  }
}
// improvemnt speak
function speak(text){
  let speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.9; // slower for kids
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);
}

/* ALPHABET LESSON */

const alphabetData = [
{l:"A",w:"Apple",obj:"🍎"},
{l:"B",w:"Ball",obj:"⚽"},
{l:"C",w:"Cat",obj:"🐱"},
{l:"D",w:"Dog",obj:"🐶"},
{l:"E",w:"Elephant",obj:"🐘"},
{l:"F",w:"Fish",obj:"🐟"},
{l:"G",w:"Grapes",obj:"🍇"},
{l:"H",w:"Hat",obj:"🎩"},
{l:"I",w:"Ice Cream",obj:"🍦"},
{l:"J",w:"Juice",obj:"🧃"},
{l:"K",w:"Kite",obj:"🪁"},
{l:"L",w:"Lion",obj:"🦁"},
{l:"M",w:"Monkey",obj:"🐵"},
{l:"N",w:"Nest",obj:"🪺"},
{l:"O",w:"Orange",obj:"🍊"},
{l:"P",w:"Pencil",obj:"✏️"},
{l:"Q",w:"Queen",obj:"👑"},
{l:"R",w:"Rabbit",obj:"🐰"},
{l:"S",w:"Sun",obj:"☀️"},
{l:"T",w:"Tiger",obj:"🐯"},
{l:"U",w:"Umbrella",obj:"☂️"},
{l:"V",w:"Violin",obj:"🎻"},
{l:"W",w:"Watermelon",obj:"🍉"},
{l:"X",w:"Xylophone",obj:"🎶"},
{l:"Y",w:"Yoyo",obj:"🪀"},
{l:"Z",w:"Zebra",obj:"🦓"}
];

let alphabetIndex = 0;

/* OPEN LESSON */

function openLesson(name){
if(name === "alphabet"){
document.getElementById("alphabetLesson").style.display="block";
updateAlphabet();
speak("Let's learn the alphabet!");
}
}

/* UPDATE (NOW INTERACTIVE) */

function updateAlphabet(){

let data = alphabetData[alphabetIndex];

document.getElementById("letterDisplay").innerText = data.l;
document.getElementById("wordDisplay").innerText = data.w;

/* EMOJI OBJECTS */
let container = document.getElementById("alphabetObjects");
container.innerHTML = "";

/* create 5 clickable emojis */
for(let i=0; i<5; i++){

let span = document.createElement("span");
span.innerText = data.obj;

span.style.fontSize = "50px";
span.style.margin = "10px";
span.style.cursor = "pointer";
span.style.display = "inline-block";
span.style.transition = "0.2s";

/* CLICK EFFECT */
span.onclick = function(){

span.style.transform = "scale(1.6)";
setTimeout(()=>{ span.style.transform="scale(1)"; },200);

/* SOUND */
speak(data.l + " for " + data.w);

};

container.appendChild(span);
}

}

/* SPEAK */

function speakLetter(){
let text = alphabetData[alphabetIndex].l + " for " + alphabetData[alphabetIndex].w;
speak(text);
}

/* NEXT */

function nextLetter(){
alphabetIndex++;
if(alphabetIndex >= alphabetData.length){
alphabetIndex = 0;
}
updateAlphabet();
speakLetter();
}

/* PREVIOUS */

function prevLetter(){
alphabetIndex--;
if(alphabetIndex < 0){
alphabetIndex = alphabetData.length - 1;
}
updateAlphabet();
speakLetter();
}

/* VOICE RECOGNITION 🎤 */

function startVoice(){

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Voice recognition not supported in this browser");
return;
}

let recognition = new SpeechRecognition();
recognition.lang = "en-US";

recognition.start();

recognition.onresult = function(event){

let spoken = event.results[0][0].transcript.toUpperCase().trim();

let correct = alphabetData[alphabetIndex].l;

/* CHECK ANSWER */
if(spoken.includes(correct)){
speak("Good job!");
nextLetter();
}else{
speak("Try again");
}

};

}

/* CLOSE */

function closeLesson(){
document.getElementById("alphabetLesson").style.display="none";
}

/* NUMBER LESSON */


const numberData = [
{n:"1", w:"One Tree", obj:"🌳"},
{n:"2", w:"Two Dogs", obj:"🐶 🐶"},
{n:"3", w:"Three Apples", obj:"🍎 🍎 🍎"},
{n:"4", w:"Four Balls", obj:"⚽ ⚽ ⚽ ⚽"},
{n:"5", w:"Five Flowers", obj:"🌸🌸🌸🌸🌸"},
{n:"6", w:"Six Fish", obj:"🐟🐟🐟🐟🐟🐟"},
{n:"7", w:"Seven Birds", obj:"🐦🐦🐦🐦🐦🐦🐦"},
{n:"8", w:"Eight Hearts", obj:"❤️❤️❤️❤️❤️❤️❤️❤️"},
{n:"9", w:"Nine Balloons", obj:"🎈🎈🎈🎈🎈🎈🎈🎈🎈"},
{n:"10", w:"Ten Stars", obj:"⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐"}
];
let numberIndex = 0;

/* OPEN */

function openNumberLesson(){

document.getElementById("numberLesson").style.display="block";

updateNumber();

speak("Come on, Let's learn numbers!");

}

/* UPDATE */

function updateNumber(){

let data = numberData[numberIndex];

document.getElementById("numberDisplay").innerText = data.n;
document.getElementById("numberWord").innerText = data.w;

/* INTERACTIVE OBJECTS */
let container = document.getElementById("numberObjects");
container.innerHTML = "";


let items = data.obj.includes(" ") 
    ? data.obj.split(" ") 
    : Array.from(data.obj);  

for(let i=0; i < items.length; i++){

let span = document.createElement("span");
span.innerText = items[i];

span.style.margin = "5px";
span.style.cursor = "pointer";

/* CLICK EFFECT */
span.onclick = function(){
span.style.transform = "scale(1.5)";
setTimeout(()=>{ span.style.transform="scale(1)"; },200);
speak(data.n);
};

container.appendChild(span);

}

}

/* SPEAK */

function speakNumber(){
let text = numberData[numberIndex].w;
speak(text);
}

/* NEXT */

function nextNumber(){

numberIndex++;

if(numberIndex >= numberData.length){
numberIndex = 0;
}

updateNumber();
speakNumber();

}

/* PREVIOUS */

function prevNumber(){

numberIndex--;

if(numberIndex < 0){
numberIndex = numberData.length - 1;
}

updateNumber();
speakNumber();

}

/* CLOSE */

function closeNumberLesson(){

document.getElementById("numberLesson").style.display="none";

}

/* SPEECH FUNCTION (IMPORTANT!) */

function speak(text){
let speech = new SpeechSynthesisUtterance(text);
speech.lang = "en-US";
window.speechSynthesis.speak(speech);
}

/*COLORS LESSON */

const colorsData = [

{name:"Red", object:"Apple", emoji:"🍎", value:"red"},
{name:"Blue", object:"Notebook", emoji:"📘", value:"blue"},
{name:"Green", object:"Leaf", emoji:"🍃", value:"green"},
{name:"Yellow", object:"Banana", emoji:"🍌", value:"yellow"},
{name:"Orange", object:"Cat", emoji:"🐱", value:"orange"},
{name:"Purple", object:"Grapes", emoji:"🍇", value:"purple"},
{name:"Pink", object:"Flower", emoji:"🌸", value:"pink"},
{name:"Black", object:"Ant", emoji:"🐜", value:"black"},
{name:"White", object:"Cloud", emoji:"☁️", value:"white"},
{name:"Brown", object:"Bear", emoji:"🐻", value:"brown"}

];

let colorIndex = 0;

function openColorsLesson(){

document.getElementById("colorsLesson").style.display="block";

updateColor();

speak("Come on, Let's learn colors");

}

function updateColor(){

let data = colorsData[colorIndex];

let nameEl = document.getElementById("colorName");
let boxEl = document.getElementById("colorBox");
let emojiEl = document.getElementById("colorEmoji");

nameEl.innerText = data.name + " " + data.object;
boxEl.style.background = data.value;
emojiEl.innerText = data.emoji;

/* MAKE EMOJI CLICKABLE */
emojiEl.style.cursor = "pointer";
emojiEl.style.display = "inline-block";
emojiEl.style.transition = "0.2s";

/* CLICK EFFECT + SPEAK AGAIN */
emojiEl.onclick = function(){

emojiEl.style.transform = "scale(1.5)";

setTimeout(()=>{
emojiEl.style.transform = "scale(1)";
},200);

/* SAY AGAIN */
speak(data.name + " " + data.object);

};

}
function speakColor(){

let data = colorsData[colorIndex];

speak(data.name + " " + data.object);

}

function nextColor(){

colorIndex++;

if(colorIndex >= colorsData.length){
colorIndex = 0;
}

updateColor();

speakColor();

}

function prevColor(){

colorIndex--;

if(colorIndex < 0){
colorIndex = colorsData.length - 1;
}

updateColor();

speakColor();

}

function closeColorsLesson(){

document.getElementById("colorsLesson").style.display="none";

}

/* SHAPES LESSON  */

const shapesData = [

{name:"Circle", type:"css", class:"circle"},
{name:"Square", type:"css", class:"square"},
{name:"Triangle", type:"css", class:"triangle"},
{name:"Rectangle", type:"css", class:"rectangle"},
{name:"Oval", type:"css", class:"oval"},
{name:"Star", type:"emoji", symbol:"⭐"},
{name:"Heart", type:"emoji", symbol:"❤️"},
{name:"Diamond", type:"emoji", symbol:"💎"},
{name:"Pentagon", type:"emoji", symbol:"🔷"},
{name:"Hexagon", type:"emoji", symbol:"⬡"}

];

let shapeIndex = 0;

/* OPEN LESSON */

function openShapesLesson(){

document.getElementById("shapesLesson").style.display="block";

updateShape();

speak("Come on, Let's learn shapes");

}

/* UPDATE SHAPE */

function updateShape(){

let data = shapesData[shapeIndex];

document.getElementById("shapeName").innerText = data.name;

let display = document.getElementById("shapeDisplay");

display.className="shapeDisplay";

if(data.type === "css"){

display.className="shapeDisplay " + data.class;
display.innerHTML="";

}else{

display.innerHTML=data.symbol;

}

}

/* SPEAK SHAPE */

function speakShape(){

let name = shapesData[shapeIndex].name;

speak(name);

}

/* NEXT */

function nextShape(){

shapeIndex++;

if(shapeIndex >= shapesData.length){
shapeIndex = 0;
}

updateShape();

speakShape();

}

/* PREVIOUS */

function prevShape(){

shapeIndex--;

if(shapeIndex < 0){
shapeIndex = shapesData.length - 1;
}

updateShape();

speakShape();

}

/* CLOSE */

function closeShapesLesson(){

document.getElementById("shapesLesson").style.display="none";

}

// clickable
function speakShape(){

  let name = shapesData[shapeIndex].name;

  let shape = document.getElementById("shapeDisplay");

  // animate
  shape.style.transform = "scale(1.6)";
  setTimeout(() => {
    shape.style.transform = "scale(1)";
  }, 200);

  speak(name);

}

