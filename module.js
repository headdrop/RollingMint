// fetch("https://headdrop.github.io/RollingMint/menu.html")
fetch("/menu.html") // 테스트용
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#float-menu").innerHTML = data;
    var btn = document.querySelector("#float-menu label.f-menu");
    btn.addEventListener("click", function() {
      if(btn.classList.contains("is-active")) {
        btn.classList.remove("bounceOut");
        btn.classList.add("bounceIn");
      } else {
        btn.classList.remove("bounceIn")
        btn.classList.add("bounceOut");
      }
    })
  });
fetch("/footer.html")
  .then(response => {
    return response.text();
  })
  .then(data => {
    document.querySelector("footer").innerHTML=data;
  })

// 공지
if (document.URL.indexOf("log")!==-1) {
  fetch("update.json").then(responce=>{
    return responce.json()
  })
  .then(data=>{
    document.getElementById("notice-version").innerText = data[0].version;
    document.getElementById("version-log").innerText = data[0].version;
    document.getElementById("notice-context").innerText = data[0].context;
  })
}