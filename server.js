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

<script async
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7863167684906431"
crossorigin="anonymous"></script>

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

.adBox{
background:#1a1a2d;
padding:25px;
border-radius:15px;
text-align:center;
border:2px dashed #444;
margin-top:20px;
}

.rankGrid{
display:grid;
gap:12px;
}

.rankItem{
background:#111122;
padding:15px;
border-radius:12px;
display:flex;
justify-content:space-between;
align-items:center;
border-left:4px solid red;
}

.rankName{
font-size:19px;
font-weight:bold;
}

.rankTag{
color:#aaa;
font-size:14px;
}

.rankNumber{
font-size:22px;
font-weight:bold;
color:#ff4444;
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

<button class="notifyBtn"
onclick="alert('Fight alerts are coming soon')">

Fight alerts coming soon

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
onclick="showSection(event,'newsSection','boxing mma ufc')">
News
</button>

<button class="tab"
onclick="showSection(event,'ufcSection','ufc')">
UFC
</button>

<button class="tab"
onclick="showSection(event,'boxingSection','boxing')">
Boxing
</button>

<button class="tab"
onclick="showRankings(event)">
Rankings
</button>

</div>

<div class="section" id="newsSection">

<div class="sectionTitle">
Latest News
</div>

<div id="news">
Loading news...
</div>

<div class="adBox">

Advertisement Space

<br><br>

Google AdSense Ready 🔥

</div>

</div>

<div class="section" id="ufcSection" style="display:none;">

<div class="sectionTitle">
UFC News
</div>

<div id="ufcNews">
Loading UFC news...
</div>

</div>

<div class="section" id="boxingSection" style="display:none;">

<div class="sectionTitle">
Boxing News
</div>

<div id="boxingNews">
Loading boxing news...
</div>

</div>

<div class="section" id="rankingsSection" style="display:none;">

<div class="sectionTitle">
UFC Champions
</div>

<div class="rankGrid">

<div class="rankItem">
<div>
<div class="rankName">Jon Jones</div>
<div class="rankTag">Heavyweight Champion</div>
</div>
<div class="rankNumber">HW</div>
</div>

<div class="rankItem">
<div>
<div class="rankName">Alex Pereira</div>
<div class="rankTag">Light Heavyweight Champion</div>
</div>
<div class="rankNumber">LHW</div>
</div>

<div class="rankItem">
<div>
<div class="rankName">Dricus du Plessis</div>
<div class="rankTag">Middleweight Champion</div>
</div>
<div class="rankNumber">MW</div>
</div>

<div class="rankItem">
<div>
<div class="rankName">Islam Makhachev</div>
<div class="rankTag">Lightweight Champion</div>
</div>
<div class="rankNumber">LW</div>
</div>

<div class="rankItem">
<div>
<div class="rankName">Ilia Topuria</div>
<div class="rankTag">Featherweight Champion</div>
</div>
<div class="rankNumber">FW</div>
</div>

</div>

<br>

<div class="sectionTitle">
Boxing Pound-for-Pound
</div>

<div class="rankGrid">

<div class="rankItem">
<div>
<div class="rankName">Oleksandr Usyk</div>
<div class="rankTag">Heavyweight</div>
</div>
<div class="rankNumber">#1</div>
</div>

<div class="rankItem">
<div>
<div class="rankName">Naoya Inoue</div>
<div class="rankTag">Super Bantamweight</div>
</div>
<div class="rank
