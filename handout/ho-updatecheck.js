function updateCheck (theme) {
  fetch("https://headdrop.github.io/RollingMint/handout/ho-desc.json").then(responce=>{ 
  return responce.json()
  })
  .then(data =>{
    if(data[theme].date > document.getElementById("update").textContent) {
      document.getElementById("update").style.color = "red";
      document.querySelector("#update+div").style.display = "block";
      document.querySelector("#update+div>a").href = data[theme].url;
    }
    console.log(data[theme].date);
  })
}