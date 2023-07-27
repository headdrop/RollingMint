window.onload=function() {
  const _skill = document.querySelectorAll(".skills input");
  _skill.forEach((element)=>{
    computeValue(element);
  })
  document.querySelector(".skills").addEventListener("change",(e)=>{
    computeValue(e.target);
  });
  


}

function computeValue (target) {
  console.log(target);
    if(target.nodeName=="INPUT") {
      console.log("테스트")
      let skillVal = target.value;
      target.nextSibling.textContent=Math.floor(skillVal / 2);
      target.nextSibling.nextSibling.textContent=Math.floor(skillVal/5);
    }
}