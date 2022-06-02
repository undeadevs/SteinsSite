var change = false;
var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


var icontainer = document.querySelector(".icons-container");
console.log(icontainer.getBoundingClientRect());

setInterval(() => {
    var tzSect = document.querySelector(".tz-section");
    var icons = icontainer.querySelectorAll("svg");
    console.log(tzSect.getBoundingClientRect().y);

    if(tzSect.getBoundingClientRect().y>400&&tzSect.getBoundingClientRect().y<=500){
        icons[2].classList.add("in-tz");
    }else if(tzSect.getBoundingClientRect().y>300&&tzSect.getBoundingClientRect().y<=400){
        icons[2].classList.add("in-tz");
        icons[1].classList.add("in-tz");
    }else if(tzSect.getBoundingClientRect().y<=300){
        icons[2].classList.add("in-tz");
        icons[1].classList.add("in-tz");
        icons[0].classList.add("in-tz");
    }else{
        icons[2].classList.remove("in-tz");
        icons[1].classList.remove("in-tz");
        icons[0].classList.remove("in-tz");
    }
}, 500)

startClock();

function startClock() {
    var startLoop = setInterval(() => {
        if (change == false) {
            setClock(timezone);
        } else {
            changingClock();
            clearInterval(startLoop);
        }
    }, 500);
}

async function changingClock() {
    document.querySelector("html").style.overflow = "hidden";
    var iter = 0;
    window.scrollTo(0, 0);
    var changingLoop = await setInterval(() => {
        if (iter < 10) {
            var h = Math.floor(Math.random() * 24);
            h = h < 10 ? "0" + h : h;
            var m = Math.floor(Math.random() * 60);
            m = m < 10 ? "0" + m : m;
            var s = Math.floor(Math.random() * 60);
            s = s < 10 ? "0" + s : s;
            document.getElementById("clock").innerHTML = `${h}.${m}.${s}`;
        }
        iter += 1;
        if (iter == 1) {
            document.querySelector("#clock").style.animation = "glow 200ms forwards, pump 250ms 4 reverse ease-in, inv-pump 300ms 200ms 4 ease-in";
            document.querySelector("#clock-bg").style.animation = "zoom-in 1s forwards, inv-pump 300ms 200ms 4 ease-in";
            document.querySelector("#timezone").style.animation = "gone 100ms forwards";
            document.querySelector("#shattered").style.display = "initial";
            document.querySelector("#shattered").style.animation = "zoom-out 1s forwards";
        } else if (iter == 10) {
            timezone = `${allTimezones[Math.floor(Math.random() * allTimezones.length)]}`;
            setClock(timezone);
            document.querySelector("#shattered").style.animation = "blink 200ms infinite alternate";
        } else if (iter > 10 && iter < 20) {
            setClock(timezone);
        } else if (iter == 20) {
            document.querySelector("html").style.overflow = "auto";
            document.querySelector("#clock").style.animation = "";
            document.querySelector("#clock-bg").style.animation = "";
            document.querySelector("#timezone").style.animation = "bacc 200ms forwards";
            document.querySelector("#shattered").style.display = "none";
            document.querySelector("#shattered").style.animation = "unglow 200ms forwards";
            change = false;
            clearInterval(changingLoop);
            startClock();
        }
    }, 100);
}

function changeTimezone() {
    change = true;
}

function setClock(tz) {
    var now = new Date().toLocaleString("en-US", { timeZone: tz });
    now = new Date(now);
    var h = now.getHours();
    h = h < 10 ? "0" + h : h;
    var m = now.getMinutes();
    m = m < 10 ? "0" + m : m;
    var s = now.getSeconds();
    s = s < 10 ? "0" + s : s;
    document.getElementById("clock").innerHTML = `${h}.${m}.${s}`;
    document.getElementById("timezone").innerHTML = now.toLocaleString("en-US", { timeZone: tz, timeZoneName: 'long' }).split(" ").slice(3).join(" ");
}

var tz_table = document.createElement("table");
tz_table.id = "tz-table";

var tz_tr = document.createElement("tr");

sortedTimezones.forEach((tz, i) => {
    if (i % 4 == 0) {
        tz_tr = document.createElement("tr");
    }
    var tz_th = document.createElement("th");
    var tz_td = document.createElement("td");
    var now = new Date().toLocaleString("en-US", { timeZone: tz });
    now = new Date(now);
    var split = now.toString().split(" ");
    var temp = tz.split("/");
    tz_th.innerHTML = temp[temp.length - 1].replace("_", " ");
    tz_td.innerHTML = split[0] + " " + split[4].split(":").slice(0, 2).join(":");
    tz_tr.appendChild(tz_th);
    tz_tr.appendChild(tz_td);
    tz_table.appendChild(tz_tr);
});

document.querySelector(".tz-wrapper").appendChild(tz_table);

var tds = document.querySelectorAll("td");

var trs = document.querySelectorAll("tr");

var currentTab = 1;

setTab(currentTab);

function nextTab() {
    currentTab += currentTab == 4 ? 0 : 1;
    setTab(currentTab);
}

function prevTab() {
    currentTab -= currentTab == 1 ? 0 : 1;
    setTab(currentTab);
}

function setTab(tab) {
    for (let i = 0; i < trs.length; i++) {
        if (i <= 21) {
            if (tab == 1) {
                trs[i].style.display = "table-row";
                document.getElementById("prev").classList.add("disabled");
            } else {
                trs[i].style.display = "none";
            }
        } else if (i > 21 && i <= 43) {
            if (tab == 2) {
                trs[i].style.display = "table-row";
                document.getElementById("prev").classList.remove("disabled");
            } else {
                trs[i].style.display = "none";
            }
        } else if (i > 43 && i <= 65) {
            if (tab == 3) {
                trs[i].style.display = "table-row";
                document.getElementById("next").classList.remove("disabled");
            } else {
                trs[i].style.display = "none";
            }
        } else {
            if (tab == 4) {
                trs[i].style.display = "table-row";
                document.getElementById("next").classList.add("disabled");
            } else {
                trs[i].style.display = "none";
            }
        }

    }
}

setInterval(() => {
    document.querySelector("#curr-time span").innerHTML = new Date();
    sortedTimezones.forEach((tz, i) => {
        var now = new Date().toLocaleString("en-US", { timeZone: tz });
        now = new Date(now);
        var split = now.toString().split(" ");
        tds[i].innerHTML = split[0] + " " + split[4].split(":").slice(0, 2).join(":");
    });
}, 500);