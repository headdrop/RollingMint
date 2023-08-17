document.write(`<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>`);
var attr; // 특성치 저장
var otherskill; // 다른 스킬 양식 저장
window.onload=function() {
  setTippy(); //툴팁
  // 시작할 때
  attr = getAttr();
  calcStats();
  defaultSkill();

  const _skill = document.querySelectorAll("input.value");
  _skill.forEach((element)=>{
    divValue(element);
  });

  // 시트의 모든 .value 바뀔때마다
  document.querySelectorAll(".sheet .content").forEach(item=>{
    if (item.parentNode.classList.contains("attr")) { // 특성치
      // 특성치 반값, 상태 계산, 특성치 영향 초기값
      item.addEventListener("change",(e)=>{
        attr = getAttr();
        defaultSkill();
        calcStats();
        firstSkillPoint(document.getElementById("sp_0_text").textContent);
        if(e.target.className=="value") divValue(e.target);
      });
    } else if (item.parentNode.classList.contains("skills")) { // 기능치
      item.addEventListener("change",(e)=>{
        if(e.target.tagName=="INPUT" && e.target.type=="text" && !e.target.classList.contains("add")) {
          clacSkillValue(e.target);
          divValue(e.target);
        }
        if (e.target.className=="sp-add"|e.target.className=="sp") {  // 성장점수 바뀔때마다
          calcSkillPoint();
        }
      });
    }
  });

  // san_start 바뀔때마다
  document.querySelector("#san_start").addEventListener("change",(e)=>{
    document.querySelector("#san span:nth-of-type(2)").textContent = Math.floor((e.target.value)/5*4);
  });
  // otherskill 추가
  document.getElementById("add_skill").addEventListener("click",addOtherSkill);
  // 초기 기능점수 클릭시
  document.getElementById("sp_0").addEventListener("click",()=>{
    let pmt = prompt("직업 기능 점수를 입력하세요\n(CoC7th 수호자 룰북 p.34-36, p.40-41 참고)\n예시) EDU*4 or 교육*4 or 60*4","근력*2+건강*4+크기*2");
    firstSkillPoint(pmt);
  });
  // 스킬 출력 옵션 변경시
  document.querySelector("[name='skill-type']").parentElement.parentElement.addEventListener("change",(e)=>{
    optionSkill(e.target.value)
  });



// onload 함수 종료
}

// -------------------------------- FUNCTIONS --------------------------------
function setTippy() { // 툴팁 및 기타 디폴트 세팅
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
  tippy(document.getElementById("san_start"),{content:"하루 시작시의 이성치"});
  tippy(document.querySelectorAll("#san .input")[0],{content:"장기적인 광기 기준 이성치"});
  tippy(document.querySelectorAll("#san .input")[1],{content:"이성 최대치"});
  tippy(document.getElementById("sp_0"),{
    content:"이 값은 직업 기능 점수와 관심 기능 점수를 더한 값입니다. 클릭하면 직업 기능 점수를 입력할 수 있습니다.",
    placement:"bottom"
  });

  // 기타 세팅
  const otherskillbase = document.getElementById("otherskill1");
  const otherskill_ = otherskillbase.cloneNode(true);
  otherskill_.id="otherskill";
  otherskill=otherskill_;
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
// 초기 기능 점수 계산
function firstSkillPoint(pmt) {
  pmt=pmt.
  replace(/(근력)/,"str").
  replace(/(건강)/,"con").
  replace(/(크기)/,"siz").
  replace(/(민첩|민첩성)/,"dex").
  replace(/(외모)/,"app").
  replace(/(지능)/,"int").
  replace(/(정신력)/,"pow").
  replace(/(교육)/,"edu");
  document.getElementById("sp_0_text").textContent = pmt;
  pmt=pmt.toLowerCase();
  pmt=pmt.replace(/\s+/g, '');
  pmt=pmt.split("+");

  let sum = {...pmt};
  let rexResult=0;
  for (let key in sum ) {
    sum[key]=sum[key].split("*");
    sum[key][1]=Number(sum[key][1]);
    switch (sum[key][0]) {
      case "str" : sum[key][0]=Number(attr.str); break;
      case "con" : sum[key][0]=Number(attr.con); break;
      case "siz" : sum[key][0]=Number(attr.siz); break;
      case "dex" : sum[key][0]=Number(attr.dex); break;
      case "app" : sum[key][0]=Number(attr.app); break;
      case "int" : sum[key][0]=Number(attr.int); break;
      case "pow" : sum[key][0]=Number(attr.pow); break;
      case "edu" : sum[key][0]=Number(attr.edu); break;
    }
    rexResult = (sum[key][0] * sum[key][1]) + (attr.int * 2) + rexResult;
  }
  console.log(sum);
  document.getElementById("sp_0").value=rexResult;
  calcSkillPoint();
}
function calcSkillPoint() {
  const sp0 = document.getElementById("sp_0").value;
  let addSkillPoint =0;
  let sumSkillPoint =0;
  document.querySelectorAll(".sp-add").forEach((item) => {
    addSkillPoint = Number(addSkillPoint) + Number(item.value);
  });
  document.querySelectorAll(".sp").forEach((item)=>{
    sumSkillPoint = Number(sumSkillPoint) + Number(item.value);
  });
  document.getElementById("sp_add").value = Number(addSkillPoint);
  document.getElementById("sp_remain").value = Number(sp0) - Number(sumSkillPoint);
}

function clacSkillValue(target){ // 기능치 값 더하기
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
    calcStats();
  }
  console.log(": calcSKILLValued");
}
// 특성치에 영향받는 기능치 초기값 + 계산
function defaultSkill () {
  document.querySelector("#language_own .skill_name").setAttribute("default",attr.edu);
  clacSkillValue(document.querySelector("#language_own .sp"));
  document.querySelector("#dodge .skill_name").setAttribute("default",Math.floor(attr.dex / 2));
  clacSkillValue(document.querySelector("#dodge .sp"));
}

function divValue (target) {
  try  {
  let skillVal = target.value;
  target.nextSibling.textContent=Math.floor(skillVal / 2);
  target.nextSibling.nextSibling.textContent=Math.floor(skillVal/5);
  } catch(e) {console.log(e)}
}
function calcStats() {
  let maxHP = Math.floor((Number(attr.con) + Number(attr.siz)) / 10);
  document.querySelector("#hp span:last-child").textContent=maxHP;
  let maxMP = Math.floor((Number(attr.pow)) / 5);
  document.querySelector("#mp span:last-child").textContent=maxMP;
  let maxSan = Math.floor(Number(attr.pow) - Number(document.querySelector("#cthulhu_mythos>input.value").value));
  document.querySelectorAll("#san .input")[1].textContent=maxSan;
  // 전투 수치
  let strSiz = Number(attr.str)+Number(attr.siz);
  var bonus, build;
  if (2<=strSiz&&strSiz<=64) {bonus=-2, build=-2}
  else if (65<=strSiz&&strSiz<=84) {bonus="-1", build="-1"}
  else if (85<=strSiz&&strSiz<=124) {bonus="0", build="0"}
  else if (125<=strSiz&&strSiz<=164) {bonus="+1D4", build=1}
  else if (165<=strSiz&&strSiz<=204) {bonus="+1D6", build=2}
  else {
    build = Math.floor((strSiz - 204) / 80)+3;
    bonus = "+"+(build-1)+"D6";
  }
  document.querySelector("#damage_bonus>input").value=bonus;
  document.querySelector("#build>input").value=build;
}

function addOtherSkill() {
  let skill = otherskill.cloneNode(true);
  skill.querySelector(".remove").addEventListener("click",(e)=>{
    skill.remove();
  });
  let otherskills = document.querySelectorAll("[id^='otherskill']");
  otherskills.forEach((item,index)=>{
    item.id="otherskill"+Number(index+1);
  });
  let num = Number(otherskills.length)+1;
  skill.id=skill.id+num;
  document.getElementById("add_skill").before(skill);
}

function optionSkill(x) {
  if (x==1) {
    document.querySelectorAll(".skills .content input.value").forEach((item)=>{
      console.log(item)
      item.readOnly=true;
    });
    document.querySelectorAll(".skills .content input[class^='sp']").forEach((item)=>{
      item.classList.remove("hide");
    });
  } else if (x==2){
    document.querySelectorAll(".skills .content input.value").forEach((item)=>{
      item.readOnly=false;
    });
    document.querySelectorAll(".skills .content input[class^='sp']").forEach((item)=>{
      item.classList.add("hide");
    });
  }
  console.log(x);
}