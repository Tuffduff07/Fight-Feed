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
padding:12
