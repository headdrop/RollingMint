
fetch("https://headdrop.github.io/RollingMint/footer.html")
      .then(response => {
      return response.text()
      })
      .then(data => {
      document.querySelector("footer").innerHTML = data;
      });
fetch("https://headdrop.github.io/RollingMint/menu.html")
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