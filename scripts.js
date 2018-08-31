function assignGolfer() {
    var btn = document.getElementById("assign");
    btn.addEventListener("click", function(){
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 && XHR.status == 200){
            var data = JSON.parse(XHR.responseText);
            var numGolfers = data.leaderboard.players.length;
            var ol = document.querySelector('ol');
            var golfers = [];

            for (var i = 0; i < 26; i++){
                golfers.push(data.leaderboard.players[i].player_bio.last_name);
            }
            for (var i = 0; i < ol.children.length; i++){
                var index = getRandom(golfers.length);
                ol.children[i].innerHTML = ol.children[i].innerHTML + ", " + golfers[index];
                golfers.splice(index, 1);     
            }
        }
    }

        var url = "https://statdata.pgatour.com/r/505/leaderboard-v2mini.json";
        XHR.open("GET", url);
        XHR.send();
    })
}

function getRandom(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function addMember() {
    var person = document.getElementById('leagueMember').value;
    var entry = document.createElement("li");
    var textEntry = document.createTextNode(person);
    entry.appendChild(textEntry);
    document.getElementById("draftList").appendChild(entry);
    document.getElementById("leagueMember").value = '';
    document.getElementById("leagueMember").focus();
}

function randomizeOrder() {
    var ol = document.querySelector('ol');
    for (var i = ol.children.length; i >= 0; i--) {
        ol.appendChild(ol.children[Math.random() * i | 0]);
    }
}

var golfers = [24502,26329,31323,24024,26851,28237,46970,36689,22405,29221];

var people, asc1 = 1, asc2 = 1, asc3 = 1;

window.onload = function() {
    getScores(golfers);
    getStrokes(golfers);
    people = document.getElementById("people");
    setTimeout(function(){ defaultSort(); }, 200);
    setTimeout(function(){ document.getElementById("scoreboard").style.display='block';}, 300);
};

function defaultSort() {
    var header = document.getElementById("strokeHeader");
    header.click();
}

function getScores(playerIds) {
    var url = "https://statdata.pgatour.com/r/505/leaderboard-v2mini.json";
    var scoreDisp = document.querySelectorAll("#score");
    var pageGolfers = document.querySelectorAll("#lName");
    var ranking = document.querySelectorAll("#position");

    fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {  
        for (i = 0; i < data.leaderboard.players.length; i++) {
            for (j = 0; j < data.leaderboard.players.length; j++) {
                if (playerIds[j] == data.leaderboard.players[i].player_id) {
                    // console.log(data.leaderboard.players[i].total + " " + data.leaderboard.players[i].player_bio.last_name);
                    // if (data.leaderboard.players[i].total == 0) {
                    //     scoreDisp[j].innerText = 'E';
                    // } else {
                    scoreDisp[j].innerText = data.leaderboard.players[i].total;
                    // console.log(playerIds);
                    // }
                }
            }
        }
    })
}

function getStrokes(playerIds) {
    var url = "https://statdata.pgatour.com/r/505/leaderboard-v2mini.json";
    var strokeDisp = document.querySelectorAll(".strokes");
    var pageGolfers = document.querySelectorAll("#lName");
    var ranking = document.querySelectorAll("#position");

    fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {  
        for (i = 0; i < data.leaderboard.players.length; i++) {
            for (j = 0; j < data.leaderboard.players.length; j++) {
                if (playerIds[j] == data.leaderboard.players[i].player_id) {
                    // console.log(data.leaderboard.players[i].total + " " + data.leaderboard.players[i].player_bio.last_name);
                    strokeDisp[j].innerText = data.leaderboard.players[i].current_position;
                    // console.log(playerIds);
                }
            }
        }
    })
}



// function sort_table(tbody, col, asc) {
//     var rows = tbody.rows,
//         rlen = rows.length,
//         arr = new Array(),
//         i, j, cells, clen;
//     // fill the array with values from the table
//     for (i = 0; i < rlen; i++) {
//         cells = rows[i].cells;
//         clen = cells.length;
//         arr[i] = new Array();
//         for (j = 0; j < clen; j++) {
//             arr[i][j] = cells[j].innerHTML;
//         }
//     }
//     // sort the array by the specified column number (col) and order (asc)
//     arr.sort(function (a, b) {
//         return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
//     });
//     // replace existing rows with new rows created from the sorted array
//     for (i = 0; i < rlen; i++) {
//         rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
//     }
// }

function sort_table(tbody, col, asc){
    var rows = tbody.rows, rlen = rows.length, arr = new Array(), i, j, cells, clen;
    // fill the array with values from the table
    for(i = 0; i < rlen; i++){
    cells = rows[i].cells;
    clen = cells.length;
    arr[i] = new Array();
        for(j = 0; j < clen; j++){
        arr[i][j] = cells[j].innerHTML;
        }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function(a, b){
        return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : 1*asc);
    });
    for(i = 0; i < rlen; i++){
        arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
    }
    tbody.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";
}

