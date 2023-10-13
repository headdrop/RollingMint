fetch("https://headdrop.github.io/RollingMint/menu.html")
// fetch("../menu.html") // 테스트용
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#float-menu").innerHTML = data;
  });
fetch("https://headdrop.github.io/RollingMint/footer.html")
  .then(response => {
    return response.text();
  })
  .then(data => {
    document.querySelector("footer").innerHTML=data;
  })

// 공지
if (document.URL.indexOf("log")!==-1 || document.URL.indexOf("handout")!==-1 || document.URL.indexOf("labelmaker")!==-1 || document.URL.indexOf("sheet-coc")!==-1) {
  const page = document.URL.split("/")[document.URL.split("/").length-2];
  pageNotice(page);
} else {
  mainNotice();
}
function pageNotice (page) {
  console.log(page);
  // fetch("/update.json").then(responce=>{ // 테스트용
  fetch("https://headdrop.github.io/RollingMint/update.json").then(responce=>{ 
    return responce.json() 
  })
  .then(data=>{
    for (i=0; i<data.length; i++) {
      if (data[i][page]) {
        const recent = data[i];
        const ver = recent.version;
        const date = recent.date;
        const txt = recent[page];
        const cls = (page=="log" ? "color-1" : page=="handout" ? "color-2" : page=="labelmaker" ? "color-3" : page=="sheet-coc" ? "color-4" : "");
        var title_ = (page=="log" ? "Roll20 로그변환" : page=="handout" ? "핸드아웃 생성기" : page=="labelmaker" ? "커스텀 장면표" : page=="sheet-coc" ? "Roll20 CoC 캐릭터 시트" : "");

        document.querySelector("#float-menu .desc-title>.desc-version").innerText = ver;
        document.querySelector("#float-menu .desc-title>.desc-date").innerText = date;
        document.querySelector("#float-menu .desc-title").classList="desc-title "+cls;
        document.querySelector("#float-menu .desc-content").innerText = txt;

        console.log(data[i][page]);
        break;
      }
    }
  })
}
function mainNotice () {
  const DIV = document.createElement("div");
  const VERSION = DIV.cloneNode(false)
  VERSION.classList.add("version-num");
  VERSION.innerHTML = `<div class="log card--1"></div>
  <div class="handout card--2"></div>
  <div class="labelmaker card--3"></div>
  <div class="sheet-coc card--4"></div>`;
fetch("update.json")
  .then(responce=>{
    return responce.json()
  })
  .then(data => {
    data.forEach((item) => {
      let content = VERSION.cloneNode(true);
      content.setAttribute("data-version", item["version"]);
      content.setAttribute("data-date", item["date"]);
      if(item["log"]) {
        content.querySelector(".log").classList.add("is-update");
        content.querySelector(".log").setAttribute("data-content", item["log"]);
      }
      if(item["handout"]) {
        content.querySelector(".handout").classList.add("is-update");
        content.querySelector(".handout").setAttribute("data-content", item["handout"]);
      }
      if(item["labelmaker"]) {
        content.querySelector(".labelmaker").classList.add("is-update");
        content.querySelector(".labelmaker").setAttribute("data-content", item["labelmaker"]);
      }
      if(item["sheet-coc"]) {
        content.querySelector(".sheet-coc").classList.add("is-update");
        content.querySelector(".sheet-coc").setAttribute("data-content", item["sheet-coc"]);
      }
      content.querySelectorAll(".is-update").forEach(item=>{
        item.addEventListener("mouseover", hovUpdate);
        item.addEventListener("click", hovUpdate);
      });
      document.querySelector("#update .update-left").appendChild(content);
    });
  });

  function hovUpdate(e) {
    const ver = e.target.parentNode.getAttribute("data-version");
    const date = e.target.parentNode.getAttribute("data-date");
    const cls = e.target.classList[1];
    const title = e.target.classList[0];
    const txt = e.target.getAttribute("data-content");

    var title_ = (title=="log" ? "Roll20 로그변환" : title=="handout" ? "핸드아웃 생성기" : title=="labelmaker" ? "커스텀 장면표" : title=="sheet-coc" ? "Roll20 CoC 캐릭터 시트" : "");
    
    document.querySelector("#update .update-desc .desc-version").innerText = ver;
    document.querySelector("#update .update-desc .desc-date").innerText = date;
    document.querySelector("#update .update-desc .desc-content").innerText = txt;
    document.querySelector("#update .update-desc").classList="update-desc "+cls;
    document.querySelector("#update .update-desc .desc-title").setAttribute("data-title",title_);

    if(e.type === "mouseover") {
      e.target.addEventListener("mouseout", function() {});
    }
  }
}