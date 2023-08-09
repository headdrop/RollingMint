document.write(`<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>`);
var attr; // 특성치 저장
window.onload=function() {
  document.querySelector(".attr").addEventListener("change",()=>{
    attr = getAttr();
    console.log(attr);
  });
  document.getElementById("sp_0").addEventListener("click",firstSkillPoint)
  const _skill = document.querySelectorAll("input.value");
  _skill.forEach((element)=>{
    divValue(element);
  });
  document.querySelector(".sheet").addEventListener("change",(e)=>{
    if(e.target.className=="value") {
      divValue(e.target);
    }
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

function getAttr() {
  var attr = {
    str : document.querySelector("#str input").value,
    con : document.querySelector("#con input").value,
    siz : document.querySelector("#siz input").value,
    dex : document.querySelector("#dex input").value,
    app : document.querySelector("#app input").value,
    int : document.querySelector("#int input").value,
    pow : document.querySelector("#pow input").value,
    edu : document.querySelector("#edu input").value
  };
  return attr;
}
function jobPoint() {

}

function firstSkillPoint() {
  let pmt = prompt("직업 기능 점수를 입력하세요\n(CoC7th 수호자 룰북 p.34-36, p.40-41 참고)\n예시) EDU*4 or 교육*4 or 60*4","근력*2+건강*4+크기*2");
  pmt=pmt.
  replace(/(근력)/,"str").
  replace(/(건강)/,"con").
  replace(/(크기)/,"siz").
  replace(/(민첩|민첩성)/,"dex").
  replace(/(외모)/,"app").
  replace(/(지능)/,"int").
  replace(/(정신력)/,"pow").
  replace(/(교육)/gi,"r");
  document.getElementById("sp_0_text").textContent = pmt;
  pmt=pmt.toLowerCase();
  
  pmt=pmt.replace(/\s+/g, '');
  pmt=pmt.split("+");
  let sum = {...pmt};
  console.log(sum);
  for (let key in sum ) {
    sum[key]=sum[key].split("*");
  }
  console.log(sum);
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
  let skillVal = target.value;
  target.nextSibling.textContent=Math.floor(skillVal / 2);
  target.nextSibling.nextSibling.textContent=Math.floor(skillVal/5);
}