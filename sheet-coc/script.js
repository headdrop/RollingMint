document.write(`<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>`);

window.onload=function() {
  const _skill = document.querySelectorAll(".skills input");
  _skill.forEach((element)=>{
    divValue(element);
  });
  document.querySelector(".skills").addEventListener("change",(e)=>{
    divValue(e.target);
    clacValue(e.target);
  });

  document.querySelectorAll(".sp, .sp-add").forEach(element=>{
    if (element.className=="sp"){
      tippy(element,{
        content:"캐릭터 생성시 배분 기능치"
      });
    } else if (element.className=="sp-add"){
      tippy(element,{
        content:"성장 기능치"
      });
    }
  });
  


}

function clacValue(target){
  if(target.className=="sp"|target.className=="sp-add") {
    const div = target.parentNode;
    let v0;
    try {
      v0 = Number(div.querySelector(".skill_name").attributes.default.value);
    } catch {
      v0 = Number(div.querySelector(".skill_name>span>input").value);
    }
    const v1 = Number(div.querySelector(".sp").value);
    const v2 = Number(div.querySelector(".sp-add").value);
    div.querySelector(".value").value = v0 + v1 + v2;
    divValue(div.querySelector(".value"));
  }
}
function divValue (target) {
  if(target.className=="value") {
    let skillVal = target.value;
    target.nextSibling.textContent=Math.floor(skillVal / 2);
    target.nextSibling.nextSibling.textContent=Math.floor(skillVal/5);
  }
}