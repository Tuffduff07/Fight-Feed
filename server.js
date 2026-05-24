const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

const LOGO_PATH = "https://i.imgur.com/8Km9tLL.png";

app.use(express.static(__dirname));

app.get("/", (req, res) => {

res.send(`

<!DOCTYPE html>
<html>
<head>

<title>Fight Feed</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

body{
margin:0;
font-family:Arial;
background:#050510;
color:white;
}

.header{
padding:30px 20px;
background:linear-gradient(135deg,#b30000,#050510);
}

.logoRow{
display:flex;
align-items:center;
gap:15px;
}

.logo{
width:70px;
height:70px;
border-radius:15px;
}

.title{
font-size:42px;
font-weight:bold;
color:#ff4444;
}

.subtitle{
margin-top:10px;
font-size:20px;
color:#ddd;
}

.breaking{
background:red;
padding:12px;
font-weight:bold;
overflow:hidden;
white-space:nowrap;
}

.breaking span{
display:inline-block;
padding-left:100%;
animation:scroll 18s linear infinite;
}

@keyframes scroll{
0%{transform:translateX(0);}
100%{transform:translateX(-100%);}
}

.section{
padding:20px;
}

.sectionTitle{
font-size:28px;
margin-bottom:15px;
}

.card{
background:#111122;
padding:18px;
border-radius:15px;
margin-bottom:15px;
border-left:5px solid red;
}

.card a{
color:white;
text-decoration:none;
font-size:20px;
font-weight:bold;
}

.source{
margin-top:8px;
color:#aaa;
font-size:14px;
}

.countdown{
font-size:30px;
font-weight:bold;
color:#ff4444;
margin-top:10px;
}

.tabs{
display:flex;
gap:10px;
overflow-x:auto;
padding:15px;
background:#070716;
}

.tab{
background:#222;
border:none;
color:white;
padding:12px 20px;
border-radius:30px;
font-size:18px;
}

.active{
background:red;
}

.notifyBtn{
width:100%;
padding:18px;
background:red;
border:none;
color:white;
font-size:20px;
font-weight:bold;
border-radius:15px;
margin-top:15px;
}

</style>

</head>

<body>

<div class="header">

<div class="logoRow">

<img class="logo" src="${LOGO_PATH}">

<div>
<div class="title">Fight Feed</div>
<div class="subtitle">Live MMA & Boxing News</div>
</div>

</div>

</div>

<div class="breaking">
<span id="breakingText">
Loading breaking news...
</span>
</div>

<div class="section">

<div class="sectionTitle">
Fight Alerts
</div>

<button class="notifyBtn" onclick="enableNotifications()">
Enable Push Notifications
</button>

</div>

<div class="section">

<div class="sectionTitle">
Next Big Fight
</div>

<div class="card">

<div>
UFC Main Event Countdown
</div>

<div class="countdown" id="countdown"></div>

</div>

</div>

<div class="tabs">

<button class="tab active"
onclick="loadNews(event,'boxing mma ufc')">
All
</button>

<button class="tab"
onclick="loadNews(event,'ufc')">
UFC
</button>

<button class="tab"
onclick="loadNews(event,'boxing')">
Boxing
</button>

<button class="tab"
onclick="loadNews(event,'mma')">
MMA
</button>

</div>

<div class="section">

<div class="sectionTitle">
Latest News
</div>

<div id="news">
Loading news...
</div>

</div>

<script>

async function enableNotifications(){

if(!("Notification" in window)){

alert("Notifications not supported");

return;

}

const permission = await Notification.requestPermission();

if(permission === "granted"){

new Notification("Fight Feed Alerts Enabled 🔥",{
body:"You will now receive breaking fight news."
});

}

}

const targetDate = new Date();
targetDate.setDate(targetDate.getDate()+5);

function updateCountdown(){

const now = new Date();

const diff = targetDate - now;

const days = Math.floor(diff / (1000*60*60*24));

const hours = Math.floor((diff / (1000*60*60)) % 24);

const mins = Math.floor((diff / (1000*60)) % 60);

document.getElementById("countdown").innerHTML =
days + "d " + hours + "h " + mins + "m";

}

setInterval(updateCountdown,1000);

updateCountdown();

async function loadBreaking(){

try{

const response =
await fetch('/news?q=breaking ufc boxing mma');

const data = await response.json();

if(data.articles && data.articles.length > 0){

document.getElementById("breakingText").innerHTML =
data.articles[0].title;

}

}catch(err){

document.getElementById("breakingText").innerHTML =
"Latest fight news unavailable";

}

}

async function loadNews(event,search){

document.querySelectorAll(".tab").forEach(btn=>{
btn.classList.remove("active");
});

event.target.classList.add("active");

document.getElementById("news").innerHTML =
"Loading news...";

try{

const response =
await fetch('/news?q='+encodeURIComponent(search));

const data = await response.json();

if(!data.articles || data.articles.length === 0){

document.getElementById("news").innerHTML =
"No articles available";

return;

}

document.getElementById("news").innerHTML =

data.articles.map(article => \`

<div class="card">

<a href="\${article.url}" target="_blank">
\${article.title}
</a>

<div class="source">
\${article.source.name || "Fight Feed"}
</div>

</div>

\`).join("");

}catch(err){

document.getElementById("news").innerHTML =
"Error loading news";

}

}

loadBreaking();

loadNews(
{target:document.querySelector(".tab.active")},
'boxing mma ufc'
);

</script>

</body>
</html>

`);

});

app.get("/news", async (req, res) => {

const query = req.query.q || "boxing mma ufc";

try{

const url =
"https://gnews.io/api/v4/search?q=" +
encodeURIComponent(query) +
"&lang=en&max=10&apikey=" +
GNEWS_API_KEY;

const response = await fetch(url);

const data = await response.json();

res.json(data);

}catch(error){

res.json({
error:error.message
});

}

});

app.listen(PORT, () => {
console.log("Fight Feed running");
});
