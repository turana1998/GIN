function toggleAccordion() {
    const button = event.target;
    button.classList.toggle("activeAccordion");
    const panel = document.getElementsByClassName("sidenav")[0];
    //let ques = document.getElementById("questions");
    if (panel.style.display === "none") {
        panel.style.display = "block";
        //ques.style.marginLeft = "20px"
    } else {
        panel.style.display = "none";
        //ques.style.marginLeft = "auto";
        //ques.style.marginRight = "auto";
    }
}


function goToQue(i) {
    //event.preventDefault();
    //  window.location.hash = '';
    history.replaceState(null, null, ' ');
    window.location.replace(window.location.href + "#t" + i);
    //window.location.hash='';
    //location.hash = "#t"+i;
    //console.log(i)


}

async function saveMultiChoice(e) {
    const elem = event.target;
    const requestOptions = {
        method: "POST",
    }

    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    const urlApi = new URL(serverURL + "/api/Exam23/SaveQ");
    const userData = {
        id: elem.dataset.id,
        cavab: elem.dataset.answer
    }
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message > 0) {
        document.getElementById("nav-" + elem.dataset.qorder).classList.remove("side-button-ans");
        document.getElementById("nav-" + elem.dataset.qorder).classList.add("side-button-ans");
    }
    if (res.error) {
        console.log(res.error);
        return;
    }
}

async function saveMultiAns(e) {
    const elem = event.target;
    let multi = Array.from(document.getElementsByName("ans-" + elem.dataset.id));
    if (multi.length == 0) return;
    const checkedList = multi.filter(x => x.checked).map((x) => x.dataset.answer).map(x => parseInt(x)).sort();
    const requestOptions = {
        method: "POST",
    }
    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    const urlApi = new URL(serverURL + "/api/Exam23/SaveQ");
    const userData = {
        id: elem.dataset.id,
        cavab: checkedList.join(',')
    }
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message > 0) {
        document.getElementById("nav-" + elem.dataset.qorder).classList.remove("side-button-ans");
        document.getElementById("nav-" + elem.dataset.qorder).classList.add("side-button-ans");
    }
    if (res.error) {
        console.log(res.error);
        return;
    }
}

async function saveShortAnswerText(e) {
    const elem = event.target;
    if (!elem.value) {
        return;
    }
    const requestOptions = {
        method: "POST",
    }

    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    const urlApi = new URL(serverURL + "/api/Exam23/SaveQ");
    const userData = {
        id: elem.dataset.id,
        cavab: elem.value
    }
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message > 0) {
        document.getElementById("nav-" + elem.dataset.qorder).classList.remove("side-button-ans");
        document.getElementById("nav-" + elem.dataset.qorder).classList.add("side-button-ans");
    }
    if (res.error) {
        console.log(res.error);
        return;
    }
}


async function saveShortAnswerNumber(e) {
    const elem = event.target;
    if (!elem.value) {
        return;
    }
    const requestOptions = {
        method: "POST",
    }

    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    const urlApi = new URL(serverURL + "/api/Exam23/SaveQ");
    const userData = {
        id: elem.dataset.id,
        cavab: elem.value
    }
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message > 0) {
        document.getElementById("nav-" + elem.dataset.qorder).classList.remove("side-button-ans");
        document.getElementById("nav-" + elem.dataset.qorder).classList.add("side-button-ans");
    }
    if (res.error) {
        console.log(res.error);
        return;
    }
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

async function changeMbtiAnswer() {
    const checkIcon = document.getElementById("check-icon").innerHTML;
    const elem = event.target || event.srcElement;
    let multi = Array.from(document.getElementsByName("mbti-" + elem.dataset.id));
    if (multi.length == 0) return;

    multi.forEach(mbtiCell => {
        mbtiCell.innerHTML = mbtiCell.dataset.s;
        if (mbtiCell.dataset.d == 'l') mbtiCell.classList.remove("lf");
        if (mbtiCell.dataset.d == 'r') mbtiCell.classList.remove("rf");
        if (mbtiCell.dataset.d == 'm') mbtiCell.classList.remove("mf");
        // switch (mbtiCell.dataset.t) {
        //     case value:
        //         if(dataset.d=='l') elem.classList.toggle("lf");
        //         break;

        //     default:
        //         break;
        // }
        //mbtiCell.value=mbtiCell.dataset.t;
    });
    elem.innerHTML = checkIcon;
    if (elem.dataset.d == 'l') elem.classList.toggle("lf");
    if (elem.dataset.d == 'r') elem.classList.toggle("rf");
    if (elem.dataset.d == 'm') elem.classList.toggle("mf");
    //
    const requestOptions = {
        method: "POST",
    }
    
    const u = JSON.parse(sessionStorage.getItem("user"));
    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    const urlApi = new URL(serverURL + "/api/Exam23/SaveQ");

    // const userData = {
    //     session_user_id:u.suid,
    //     question_id: elem.dataset.id,
    //     cavab:  elem.dataset.t
    // }
    const userData = {
        id: elem.dataset.id,
        cavab: elem.dataset.t
    }
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message > 0) {
        document.getElementById("nav-" + elem.dataset.o).classList.remove("side-button-ans");
        document.getElementById("nav-" + elem.dataset.o).classList.add("side-button-ans");
    }
    if (res.error) {
        console.log(res.error);
        return;
    }
    //window.location.hash = '';
    
    document.getElementById("div-mbti-" + elem.dataset.id).classList.remove("mbt-checked");
    document.getElementById("div-mbti-" + elem.dataset.id).classList.add("mbt-checked");
    const next = parseInt(elem.dataset.o) + 1;
    history.replaceState(null, null, ' ');
    window.location.replace(window.location.href + "#t" + next);
}

function pageNavigate() {
    //alert(1);
}
async function finishBlok(blok) {
    const requestOptions = {
        method: "GET",
    }

    const u = JSON.parse(sessionStorage.getItem("user"));
    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    const urlApi = new URL(serverURL + "/api/Exam23/GetBlockTestInfo");
    let blokList = blok;
    if (blok == 10) {
        blokList = '1,2,3,4,5,6,7,8,9,10';
    }
    const userData = {
        sessionID: u.SessionID,
        userID: u.ID,
        block: blokList
    }

    //return;
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message) {
        let message = res.message;

        if (res.cavablandirilmayan != 0) {
            if (blok == 10) {
                message = 'Təfəkkür testi üzrə cavablandırmadığınız ' + res.cavablandirilmayan + ' suallar var, olduğu kimi təsdiqləmək istəyirsiniz?';
            }
            else {
                document.getElementById("exam-info-info").innerHTML = 'Cavablandırmadığınız ' + res.cavablandirilmayan + ' suallar vardır. Bütün suallar mütləq cavablandırılmalıdır';
                $('#exam-info-modal').modal('show');
                return;
            }
        }
        document.getElementById("exam-exit-info").innerHTML = message;
        $('#exam-exit-modal').modal('show');

    }
    if (res.error) {
        console.log(res.error);
        return;
    }
}

async function acceptBlok(c, b, url) {
    const requestOptions = {
        method: "POST",
    }

    const u = JSON.parse(sessionStorage.getItem("user"));
    //const localURL = "http://localhost:44353";
    const hostingURL = "https://exidmet.dim.gov.az/oen";
    const serverURL = hostingURL;
    //AcceptQBlok(int sessionID, int userID, string blokList, int aktual)
    const urlApi = new URL(serverURL + "/api/Exam23/AcceptQBlok");
    let blokList = b;
    if (b == 10) {
        blokList = '1,2,3,4,5,6,7,8,9,10';
    }
    const userData = {
        sessionID: u.SessionID,
        userID: u.ID,
        blokList: blokList,
        aktual: 2
    }

    //return;
    urlApi.search = new URLSearchParams(userData);
    const res = await fetch(urlApi.href, requestOptions).then((x) => x.json());
    if (res.message) {
        let message = res.message;
        if (message = 1) {
            locate2Test(c, b, url);
        }


    }
    if (res.error) {
        console.log(res.error);
        return;
    }
}


function locate2Test(c, b, url) {
    let nextB, nextC;
    if (b < 10) {
        nextB = b + 1;
        nextC = c;
    }
    if (b == 10) {
        nextB = 12;
        nextC = 3;
    }
    if (b == 11) {
        nextB = 12;
        nextC = 4;
    }
    if (b == 12) {
        nextB = 11;
        nextC = 2;
    }
    if (b == 13) {
        return;
    }
    // const urlApi = new URL(location.href)
    // const userData = {
    //     c: nextC,
    //     b: nextB
    // };
    // urlApi.search = new URLSearchParams(userData);
    // window.location.replace(urlApi.href);
    startExam(nextC, nextB, url);
}

function locate2NextPage(c, b) {
    let nextB, nextC;
    if (b < 10) {
        nextB = b + 1;
        nextC = c;
    }
    if (b == 10) {
        return;
    }
    const urlApi = new URL(location.href)
    const userData = {
        c: nextC,
        b: nextB
    };
    urlApi.search = new URLSearchParams(userData);
    window.location.hash = '';
    window.location.replace(urlApi.href);
}

async function startExam(c, b, url) {
    //const button = document.querySelector("#t" + c);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const urlApi = new URL(url, location.href);
    const requestOptions = {
        method: "POST",
    }
    let userData;
    if (user) {
        userData = {
            s: user.SessionID,
            n: user.ID,
            c: c,
            b: b
        };
        urlApi.search = new URLSearchParams(userData);
    }
    const resp = await fetch(urlApi.href, requestOptions)
    if (resp.status == 200) {
        resp.json()
            .then(x => {
                if (x.loginUrl) {
                    //console.log(x.loginUrl);
                    window.location.replace(x.loginUrl);
                }
                if (x.message) {
                    document.querySelector(".modal-body").innerHTML = x.message;
                    $('#xeberdarliq').modal('show');
                }
                if (x.testURL) {
                    console.log(x.testURL);
                    window.location.replace(x.testURL);
                }
            })
    }
}

async function getUserNetice(url) {
    // const button = document.querySelector("#get-netice");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const urlApi = new URL(url, location.href);
    const requestOptions = {
        method: "POST",
    }
    let userData;
    if (user) {
        userData = {
            s: user.SessionID,
            n: user.ID,
        };
        urlApi.search = new URLSearchParams(userData);
    }

    const resp = await fetch(urlApi.href, requestOptions)
    if (resp.status == 200) {
        resp.json()
            .then(x => {
                if (x.loginUrl) {
                    //console.log(x.loginUrl);
                    window.location.replace(x.loginUrl);
                }
                if (x.message) {
                    document.querySelector(".modal-body").innerHTML = x.message;
                    $('#xeberdarliq').modal('show');
                }
                if (x.testURL) {
                    console.log(x.testURL);
                    window.location.replace(x.testURL);
                }
            })
    }




    // const user = JSON.parse(sessionStorage.getItem("user"));
    // const urlApi = new URL(button.dataset.url, location.href);

    // if (user) {
    //     const userData = {
    //         s: user.SessionID,
    //         n: user.ID
    //     };
    //     urlApi.search = new URLSearchParams(userData);
    //     window.location.replace(urlApi.href);
    // }
    // else {
    //     const userData = {
    //         suid: 0
    //     };
    //     urlApi.search = new URLSearchParams(userData);
    //     window.location.replace(urlApi.href);
    // }


}