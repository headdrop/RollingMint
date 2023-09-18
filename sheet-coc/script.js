document.write(`<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>`);
var attr; // 특성치 저장
var otherskill, otherweapon; // 추가 양식 저장
window.onload=function() {
  setTippy(); //툴팁
  startFunc(); // 시작할 때
  
  defaultSaveSlot();
  optionSkill(document.querySelector("[name='skill-type']:checked").value);

  // EVENT:: 시트의 모든 .value 바뀔때마다 
  document.querySelectorAll(".sheet .content").forEach(item=>{
    if (item.parentNode.classList.contains("attr")) {
      // 특성치
      // 특성치 반값, 상태 계산, 특성치 영향 초기값
      item.addEventListener("change",(e)=>{
        attr = getAttr();
        defaultSkill();
        calcStats();
        firstSkillPoint(document.getElementById("sp_0_text").textContent);
        if(e.target.className=="value") divValue(e.target);
      });
    } else if (item.parentNode.classList.contains("skills")) {
      // 기능치
      item.addEventListener("change",(e)=>{
        if(e.target.tagName=="INPUT" && e.target.type=="text") {
          clacSkillValue(e.target);
          divValue(e.target);
        }
        if (e.target.className=="sp-add"|e.target.className=="sp") {  // 성장점수 바뀔때마다
          calcSkillPoint();
        }
      });
    }
  });

  // EVENT:: san_start 바뀔때마다
  document.querySelector("#san_start").addEventListener("change",(e)=>{
    document.querySelector("#san span:nth-of-type(2)").textContent = Math.floor((e.target.value)/5*4);
  });
  // EVENT:: otherskill, otherweapon 추가
  document.getElementById("add_skill").addEventListener("click", ()=>addOther("skill"));
  document.getElementById("add_weapon").addEventListener("click", ()=>addOther("weapon"));
  // EVENT:: 초기 기능점수 클릭시
  document.getElementById("sp_0").addEventListener("click",()=>{
    let pmt = prompt("직업 기능 점수를 입력하세요\n(CoC7th 수호자 룰북 p.34-36, p.40-41 참고)\n예시) EDU*4 or 교육*4 or 60*4","근력*2+건강*4+크기*2");
    firstSkillPoint(pmt);
  });
  // 계산: 이동력(mov), 현금자산
  document.querySelector("#mov>i").addEventListener("click",mov);
  document.querySelector(".money .title>i").addEventListener("click",calcAssets);
  // 스킬 출력 옵션 변경시
  document.querySelector("[name='skill-type']").parentElement.parentElement.addEventListener("change",(e)=>{
    optionSkill(e.target.value)
  });

  // option 버튼 동작
  document.getElementById("slot_get").addEventListener("click",slotButton);
  document.getElementById("slot_set").addEventListener("click",slotButton);
  document.getElementById("slot_remove").addEventListener("click",slotButton);
  // document.getElementById("export_json").addEventListener("click",);
  document.getElementById("export_vtt").addEventListener("click",vtt);
  document.getElementById("import_button").addEventListener("click",importButton);

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
  tippy(document.getElementById("mov"),{
    content:"아이콘을 클릭하면 이동력이 계산됩니다. 계산된 값은 인간 기준이며, 나이에 따른 이동력 감소가 적용되어 있지 않습니다.(수호자 룰북 33p) ",
    placement:"bottom"
  });
  tippy(document.querySelectorAll(".money .title")[1],{
    content:"아이콘을 클릭하면 재력에서 소비수준, 현금, 자산이 계산됩니다.(수호자 룰북 47p) "
  });

  
  // 기본값 더하기 계산을 위한 defaut 값 Event 작업
  document.querySelector("#otherskill1 .skill_name>span>input").addEventListener("change",(e)=>{
    e.target.parentElement.parentElement.setAttribute("default",e.target.value);
  });

  // 추가 무기 추가 스킬 base 만들기
  const otherskill_ = document.getElementById("otherskill1").cloneNode(true);
  otherskill_.id="otherskill";
  otherskill=otherskill_;
  const otherweapon_ = document.getElementById("weapon1").cloneNode(true);
  otherweapon=otherweapon_;
}

function startFunc () {
  attr = getAttr();
  calcStats();
  defaultSkill();
  const _skill = document.querySelectorAll("input.value");
  _skill.forEach((element)=>{
    divValue(element);
  });
  
  
}


function defaultSaveSlot() {
  for (i=1;i<=5;i++) {
    try{
    const saveSlotName = JSON.parse(localStorage[i]).character.name;
    document.querySelectorAll(".saveslot>span")[i-1].textContent = `[${i}]-${saveSlotName}`;
    } catch  {}
  }
}
function getAttr() {
  var attr = {
    str : Number(document.querySelector("#str input").value),
    con : Number(document.querySelector("#con input").value),
    siz : Number(document.querySelector("#siz input").value),
    dex : Number(document.querySelector("#dex input").value),
    app : Number(document.querySelector("#app input").value),
    int : Number(document.querySelector("#int input").value),
    pow : Number(document.querySelector("#pow input").value),
    edu : Number(document.querySelector("#edu input").value)
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
      case "str" : sum[key][0]=attr.str; break;
      case "con" : sum[key][0]=attr.con; break;
      case "siz" : sum[key][0]=attr.siz; break;
      case "dex" : sum[key][0]=attr.dex; break;
      case "app" : sum[key][0]=attr.app; break;
      case "int" : sum[key][0]=attr.int; break;
      case "pow" : sum[key][0]=attr.pow; break;
      case "edu" : sum[key][0]=attr.edu; break;
    }
    rexResult = (sum[key][0] * sum[key][1]) + (attr.int * 2) + rexResult;
  }
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
  var div, v0;
  if(target.className=="sp"|target.className=="sp-add") {
    div = target.parentElement;
  } else if (target.className=="add") {
    div = target.parentElement.parentElement.parentElement;
  }
  try {
    v0 = Number(div.querySelector(".skill_name").attributes.default.value);
  } catch {v0=0}
 
  const v1 = Number(div.querySelector(".sp").value);
  const v2 = Number(div.querySelector(".sp-add").value);
  div.querySelector(".value").value = v0 + v1 + v2;
  divValue(div.querySelector(".value"));
  calcStats();

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
    if(target.nextSibling.className=="halfvalue") {
      let skillVal = target.value;
      target.nextSibling.textContent=Math.floor(skillVal / 2);
      target.nextSibling.nextSibling.textContent=Math.floor(skillVal/5);
    }
  } catch(e) {console.log(e)}
}
function calcStats() {
  let maxHP = Math.floor((attr.con + attr.siz) / 10);
  document.querySelector("#hp span.input").textContent=maxHP;
  let maxMP = Math.floor((attr.pow) / 5);
  document.querySelector("#mp span.input").textContent=maxMP;
  let maxSan = Math.floor(attr.pow - Number(document.querySelector("#cthulhu_mythos>input.value").value));
  document.querySelectorAll("#san .input")[1].textContent=maxSan;
  // 전투 수치
  let strSiz = attr.str+attr.siz;
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
  const dodge = document.querySelector("#dodge .value").value;
  document.querySelector("#dodge_>div>span").textContent = dodge;
  document.querySelector("#dodge_>div>.halfvalue").textContent=Math.floor(dodge / 2);
  document.querySelector("#dodge_>div>.fifthvalue").textContent=Math.floor(dodge / 5);
}

function mov() {
  if (attr.dex<attr.siz && attr.str<attr.siz) {
    document.querySelector("#mov>input.value").value=7;
  } else if (attr.dex>attr.siz && attr.str>attr.siz) {
    document.querySelector("#mov>input.value").value=9;
  } else {
    document.querySelector("#mov>input.value").value=8;
  }

}
function calcAssets () {
  if (document.querySelector("[name='assets']:checked")===null) {
    alert("시대 구분을 선택하세요!")
  } else {
    const credit = document.querySelector("#credit_rating input.value").value;
    const era = document.querySelector("[name='assets']:checked").value;
    let spending = document.querySelector("#spending_level input");
    let cash = document.querySelector("#cash input");
    let asset = document.querySelector("#assets textarea");
    switch (era) {
      case "1920":
        console.log(credit)
        if (credit<=0)  {
          cash.value = "$0.50";
          asset.value = "없음";
          spending.value = "$0.50";
        } else if (1<=credit<10) {
          cash.value = "$"+credit*1;
          asset.value = "$"+credit*10;
          //spending.value = "$2";
        } else if (10<=credit<50) {
          cash.value = "$"+credit*2;
          asset.value = "$"+credit*50;
          spending.value = "$10";
        } else if (50<=credit<90) {
          cash.value = "$"+credit*5;
          asset.value = "$"+credit*500;
          spending.value = "$50";
        } else if (90<=credit<99) {
          cash.value = "$"+credit*20;
          asset.value = "$"+credit*2000;
          spending.value = "$250";
        } else if (credit>=99) {
          cash.value = "$50,000";
          asset.value = "$5백만+";
          spending.value = "$5000";
        }
    }
    

  }
}

function addOther(type_) {
  let type, otheritems, otherId;
  if (type_ == "skill") {
    type = otherskill.cloneNode(true);
    type.querySelector(".skill_name>span>input").addEventListener("change",(e)=>{
      e.target.parentElement.parentElement.setAttribute("default",e.target.value);
    });
    otherId = "otherskill";
  } else if (type_ == "weapon") {
    type = otherweapon.cloneNode(true);
    otherId = "weapon";
  }
  type.querySelector(".remove").addEventListener("click",(e)=>{
    type.remove();
    otheritems = document.querySelectorAll(`[id^='${otherId}']`);
    otheritems.forEach((item,index)=>item.id=otherId+Number(index+1));
  });
  document.getElementById(`add_${type_}`).before(type);

  otheritems = document.querySelectorAll(`[id^='${otherId}']`);
  otheritems.forEach((item,index)=>item.id=otherId+Number(index+1));
}

function optionSkill(x) {
  if (x==1) {
    document.querySelector(".skill_point").classList.remove("hide");
    document.querySelectorAll(".skills .content input.value").forEach((item)=>{
      item.readOnly=true;
    });
    document.querySelectorAll(".skills .content input[class^='sp']").forEach((item)=>{
      item.classList.remove("hide");
    });
  } else if (x==2){
    document.querySelector(".skill_point").classList.add("hide");
    document.querySelectorAll(".skills .content input.value").forEach((item)=>{
      item.readOnly=false;
    });
    document.querySelectorAll(".skills .content input[class^='sp']").forEach((item)=>{
      item.classList.add("hide");
    });
  }
}



function vtt () {
  const random = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };
  // 랜덤 함수 끝

  console.log("vtt");
  var xx;
  const idFirst = "-"+random(5);
  
  xx={
    "schema_version": 3,
    "type": "character",
    "name": document.querySelector("#name input").value,
    "character": {
      "name": document.querySelector("#name input").value,
      // 여기서 아래까지 이미 입력된 것을 불러온 상태라면 그것으로 대체
      "avatar": "",
      "bio": "",
      "gmnotes": "",
      "defaulttoken": "",
      "tags": "[]",
      // 여기까지 + 뒤의 어빌리티
      "controlledby": "",
      "inplayerjournals": "",
      "attribs": [
        {
          "name": "str_txt",
          "current": "근력",
          "max": "",
          "id": "-Na9T7x9bPNEYP1ejP1a"
        },
        {
            "name": "dex_txt",
            "current": "민첩",
            "max": "",
            "id": "-Na9T7xALmC10F2jmIPG"
        },
        {
            "name": "pow_txt",
            "current": "정신",
            "max": "",
            "id": "-Na9T7xDhddnu03wOxyM"
        },
        {
            "name": "con_txt",
            "current": "건강",
            "max": "",
            "id": "-Na9T7xET96uxevWLEnE"
        },
        {
            "name": "app_txt",
            "current": "외모",
            "max": "",
            "id": "-Na9T7xFsCMn3shInBS5"
        },
        {
            "name": "edu_txt",
            "current": "교육",
            "max": "",
            "id": "-Na9T7xFsCMn3shInBS6"
        },
        {
            "name": "siz_txt",
            "current": "크기",
            "max": "",
            "id": "-Na9T7xGsxTEsZcVc4kl"
        },
        {
            "name": "int_txt",
            "current": "지능",
            "max": "",
            "id": "-Na9T7xHsXoHe9hg9mmb"
        },
        {
            "name": "luck_txt",
            "current": "운",
            "max": "",
            "id": "-Na9T7xHsXoHe9hg9mmc"
        },
        {
            "name": "accounting_txt",
            "current": "회계",
            "max": "",
            "id": "-Na9T7xHsXoHe9hg9mmd"
        },
        {
            "name": "anthropology_txt",
            "current": "인류학",
            "max": "",
            "id": "-Na9T7xI9Hxy9Jp_iaYj"
        },
        {
            "name": "appraise_txt",
            "current": "감정",
            "max": "",
            "id": "-Na9T7xI9Hxy9Jp_iaYk"
        },
        {
            "name": "archaeology_txt",
            "current": "고고학",
            "max": "",
            "id": "-Na9T7xJUrd6_Vhp12Pc"
        },
        {
            "name": "charm_txt",
            "current": "매혹",
            "max": "",
            "id": "-Na9T7xJUrd6_Vhp12Pd"
        },
        {
            "name": "climb_txt",
            "current": "오르기",
            "max": "",
            "id": "-Na9T7xJUrd6_Vhp12Pe"
        },
        {
            "name": "creditrating_txt",
            "current": "재력",
            "max": "",
            "id": "-Na9T7xKK4eI6lLjmy3B"
        },
        {
            "name": "cthulhumythos_txt",
            "current": "크툴루 신화",
            "max": "",
            "id": "-Na9T7xKK4eI6lLjmy3C"
        },
        {
            "name": "disguise_txt",
            "current": "변장",
            "max": "",
            "id": "-Na9T7xKK4eI6lLjmy3D"
        },
        {
            "name": "dodge_txt",
            "current": "회피",
            "max": "",
            "id": "-Na9T7xLRNCcwkqTnV8p"
        },
        {
            "name": "driveauto_txt",
            "current": "자동차 운전",
            "max": "",
            "id": "-Na9T7xLRNCcwkqTnV8q"
        },
        {
            "name": "elecrepair_txt",
            "current": "전기수리",
            "max": "",
            "id": "-Na9T7xMSMdwIVDVvT51"
        },
        {
            "name": "fasttalk_txt",
            "current": "말재주",
            "max": "",
            "id": "-Na9T7xMSMdwIVDVvT52"
        },
        {
            "name": "fighting_brawl_txt",
            "current": "근접전(격투)",
            "max": "",
            "id": "-Na9T7xNpM9tTSctDIwz"
        },
        {
            "name": "firearms_hg_txt",
            "current": "사격(권총)",
            "max": "",
            "id": "-Na9T7xNpM9tTSctDIx-"
        },
        {
            "name": "firearms_rs_txt",
            "current": "사격(라/산)",
            "max": "",
            "id": "-Na9T7xOx2R29kPSj4Uv"
        },
        {
            "name": "firstaid_txt",
            "current": "응급처치",
            "max": "",
            "id": "-Na9T7xOx2R29kPSj4Uw"
        },
        {
            "name": "history_txt",
            "current": "역사",
            "max": "",
            "id": "-Na9T7xPpjAtU1ieqW7t"
        },
        {
            "name": "intimidate_txt",
            "current": "위협",
            "max": "",
            "id": "-Na9T7xPpjAtU1ieqW7u"
        },
        {
            "name": "jump_txt",
            "current": "도약",
            "max": "",
            "id": "-Na9T7xPpjAtU1ieqW7v"
        },
        {
            "name": "language_own_txt",
            "current": "언어(모국어)",
            "max": "",
            "id": "-Na9T7xQJRF1O-sI43GM"
        },
        {
            "name": "law_txt",
            "current": "법률",
            "max": "",
            "id": "-Na9T7xQJRF1O-sI43GN"
        },
        {
            "name": "libraryuse_txt",
            "current": "자료조사",
            "max": "",
            "id": "-Na9T7xQJRF1O-sI43GO"
        },
        {
            "name": "listen_txt",
            "current": "듣기",
            "max": "",
            "id": "-Na9T7xR3squ-KLXqXiU"
        },
        {
            "name": "locksmith_txt",
            "current": "열쇠공",
            "max": "",
            "id": "-Na9T7xR3squ-KLXqXiV"
        },
        {
            "name": "mechrepair_txt",
            "current": "기계수리",
            "max": "",
            "id": "-Na9T7xSCw5XcpnbIqiZ"
        },
        {
            "name": "medicine_txt",
            "current": "의료",
            "max": "",
            "id": "-Na9T7xSCw5XcpnbIqi_"
        },
        {
            "name": "naturalworld_txt",
            "current": "자연",
            "max": "",
            "id": "-Na9T7xSCw5XcpnbIqia"
        },
        {
            "name": "navigate_txt",
            "current": "항법",
            "max": "",
            "id": "-Na9T7xTH6Ht1Fsfcte8"
        },
        {
            "name": "occult_txt",
            "current": "오컬트",
            "max": "",
            "id": "-Na9T7xTH6Ht1Fsfcte9"
        },
        {
            "name": "ophvmachine_txt",
            "current": "중장비 조작",
            "max": "",
            "id": "-Na9T7xU7KW9EwOX-ky7"
        },
        {
            "name": "persuade_txt",
            "current": "설득",
            "max": "",
            "id": "-Na9T7xU7KW9EwOX-ky8"
        },
        {
            "name": "psychology_txt",
            "current": "심리학",
            "max": "",
            "id": "-Na9T7xVANYPX8OIo-4x"
        },
        {
            "name": "psychoanalysis_txt",
            "current": "정신분석",
            "max": "",
            "id": "-Na9T7xVANYPX8OIo-4y"
        },
        {
            "name": "ride_txt",
            "current": "승마",
            "max": "",
            "id": "-Na9T7xVANYPX8OIo-4z"
        },
        {
            "name": "sleightofhand_txt",
            "current": "손놀림",
            "max": "",
            "id": "-Na9T7xW5SC8O2ZaX-GS"
        },
        {
            "name": "spothidden_txt",
            "current": "관찰력",
            "max": "",
            "id": "-Na9T7xW5SC8O2ZaX-GT"
        },
        {
            "name": "stealth_txt",
            "current": "은밀행동",
            "max": "",
            "id": "-Na9T7xXgqUVfGycVJVC"
        },
        {
            "name": "swim_txt",
            "current": "수영",
            "max": "",
            "id": "-Na9T7xXgqUVfGycVJVD"
        },
        {
            "name": "throw_txt",
            "current": "투척",
            "max": "",
            "id": "-Na9T7xXgqUVfGycVJVE"
        },
        {
            "name": "track_txt",
            "current": "추적",
            "max": "",
            "id": "-Na9T7xYIHUHQW28_xTd"
        },
        {
            "name": "unarmed_txt",
            "current": "비무장",
            "max": "",
            "id": "-Na9T7xYIHUHQW28_xTe"
        }
      ]
    }
  }
  const skill = document.querySelectorAll(".skills .content>div[id]");
  const weapon = document.querySelectorAll(".weapons .content>div.table_item[id]");
  const etc = document.querySelectorAll(`
    .info .content>div[id]>input,
    .attr .content>div[id]>input,
    .stats .content>div[id]>input:not([id]),
    .battle .content>div[id]>input,
    .backstory .content>div[id]>textarea,
    #spending_level>input, #cash>input, #assets>textarea
    `);
  const xcpt = document.querySelectorAll("#san_start, #gear_and_posessions"); // input or textarea 의 id를 가지고 있는 것
  // -----
  xx.character.bio = xx.character.bio+"\n이 캐릭터시트는 Rolling Mint 에서 작성되었습니다.";
  xx.character.attribs.name = xx.character.name;
  skill.forEach(function (item) {
    xx.character.attribs.push({
      "name": item.id,
      "current" : item.querySelector(".value").value,
      "max" : "",
      "id" : idFirst+random(14)
    });
      if (item.id.startsWith('otherskill')) {
        xx.character.attribs.push({
          "name":item.id+"_name",
          "current":item.querySelector(".skill_name input._name").value,
          "max":"",
          "id" : idFirst+random(14)
        })
      }
  });
  weapon.forEach(function (item) {
    item.querySelectorAll("input").forEach((wp) => {
      xx.character.attribs.push({
        "name" : item.id +"_"+ wp.className,
        "current" : wp.value,
        "max" : "",
        "id" : idFirst+random(14)
      });
    });
  });
  etc.forEach(function (item) {
    xx.character.attribs.push({
      "name": item.parentNode.id,
      "current" : item.value,
      "max" : "",
      "id" : idFirst+random(14)
    });
  });
  xcpt.forEach(function (item) {
    xx.character.attribs.push({
      "name": item.id,
      "current" : item.value,
      "max" : "",
      "id" : idFirst+random(14)
    });
  });
  return xx;
}

// SAVE FUNCTIONS
function slotButton (e) {
  try {
    const type = e.target.id.replace("slot_","");
    const num = document.querySelector("[name='saveslot']:checked").value;
    console.log(num+"번 슬롯에 "+type+" 합니다.");
    const slot_ = slot();
    switch (type) {
      case "get" :
        const data = JSON.parse(localStorage.getItem(num));
        load(data);
      break;
      case "set" :
        localStorage.setItem(num,JSON.stringify(slot_));
        document.querySelector("[name='saveslot']:checked").nextSibling.textContent = `[${num}]-${slot_.character.name}`;
      break;
      case "remove" :
        localStorage.removeItem(num);
        document.querySelector("[name='saveslot']:checked").nextSibling.textContent = `[${num}]-캐릭터명`;
      break;
    }
  } catch (err) {
    console.log("err:"+err);
  }
}
function slot () {
  var ss;
  ss = vtt();
  ss.rolling_mint = {};
  ss.rolling_mint.job_point = document.getElementById("sp_0_text").textContent;
  ss.rolling_mint.skill_type=document.querySelector("[name='skill-type']").value;

  if (ss.rolling_mint.skill_type==1) {
    ss.rolling_mint.skills = [];
    const skill = document.querySelectorAll(".skills .content>div[id]");
    skill.forEach(function (item) {
      var dd;
      if (item.id.startsWith('otherskill')) {
        const txt = item.querySelector("._name").value;
        dd = item.querySelector(".skill_name>span>input.add").value;
        ss.rolling_mint.skills.push({
          "name": item.id,
          "sp" : item.querySelector(".sp").value,
          "sp-add" : item.querySelector(".sp-add").value,
          "current" : item.querySelector(".value").value,
          "default" : dd,
          "txt" : txt
        });
      } else {
        dd = item.querySelector(".skill_name").attributes.default.value;
        ss.rolling_mint.skills.push({
          "name": item.id,
          "sp" : item.querySelector(".sp").value,
          "sp-add" : item.querySelector(".sp-add").value,
          "current" : item.querySelector(".value").value,
          "default" : dd
        });
      }
    });
  }

  return ss;
}


function load (jj) {
  const tg = {
    "A" : ["str","con","siz","dex","app","int","pow","edu","name","player","occupation","age","sex","residence","birthplace","mov","hp","mp","san","luck","build","damage_bonus","spending_level","cash"],
    "A_address" : ">input:not([id])",
    "B": ["personal_description","ideaology_beliefs","significant_people","meaningful_locations","teasured_posessions","traits","injuries_scars","phobias_manias","tomes_spells_artifacts","encounters_with_strange_entities","assets"],
    "B_address" : ">textarea",
    "C" : ["san_start","gear_and_posessions","current_mental_condition","majorwoundcurrent"],
    "D" : ["dying","temp_insane","indef_insane","major-wound-toggle"],
  }
  resetSheet(tg);

  if (jj.schema_version==3 && jj.type=='character') {
    var arr = [];
    jj.character.attribs.forEach((item)=>{
      if (item.name.indexOf("_txt")===-1) arr.push(item)
    });
    jj.character.attribs = arr; // txt 삭제
    var skills = [];
    try {
    jj.character.attribs.forEach((item)=>{
      if (tg.A.indexOf(item.name)!==-1) { // item name 이 tg A에 있을 때
        document.querySelector(`#${item.name+tg.A_address}`).value=item.current;
      } else if (tg.B.indexOf(item.name)!==-1) {
        document.querySelector(`#${item.name+tg.B_address}`).value=item.current;
      } else if (tg.C.indexOf(item.name)!==-1) {
        document.querySelector(`#${item.name}`).value=item.current;
      } else if (tg.D.indexOf(item.name)!==-1) {
        item.current = (item.current=="1") ? true : false;
        document.querySelector(`#${item.name}`).checked=item.current;
      } else if ((item.name.indexOf("_checkbox")!==-1) && (item.name.startsWith("otherskill")===false)) {
        // 체크박스
        let val = (item.current=="on") ? true : false;
        let nm = item.name.slice(0,-9);
        document.querySelector(`#${nm} input[type='checkbox']`).checked=val;
      } else if (item.name.startsWith("weapon")) { // weapons
        const weaponNum = item.name.split("_")[0];
        const sub = item.name.split("_")[1];
        if(document.querySelector(`#${weaponNum}`)===null) {
          addOther("weapon");
          document.querySelectorAll('[id^=weapon]')[document.querySelectorAll('[id^=weapon]').length -1].id=weaponNum;
        }
        document.querySelector(`#${weaponNum}>.${sub}`).value=item.current;
      } else {
        skills.push(item); // skill 분리
      }
    });

    if (jj.rolling_mint==undefined) { 
      skills.forEach((item)=>{
        if (item.name.startsWith("otherskill")) {
          // otherskill
          const itemId = item.name.split("_")[0];
          // 없으면 생성
          if(document.querySelector(`#${itemId}`)===null) {
            addOther("skill");
          }
          const sub = item.name.split("_")[1];
          if (sub===undefined) {
            document.querySelector(`#${itemId} input.value`).value=item.current;
          } else if (sub==="name") {
            document.querySelector(`#${itemId} input._name`).value=item.current;
          } else if (sub==="checkbox") {
            if(item.current=="on") {
              document.querySelector(`#${itemId} input[type='checkbox']`).checked=true;
            } else {
              document.querySelector(`#${itemId} input[type='checkbox']`).checked=false;
            }
            
          }
        } else {
          try {
            document.querySelector(`#${item.name} .value`).value=item.current;
          } catch (err) {
            // id 없는 item
            console.log(item.name);
          }
        }
      });
    } else {
      jj.rolling_mint.skills.forEach((item)=>{
        if (item.name.startsWith("otherskill")) {
          if(document.querySelector(`#${item.name}`)===null) {
            addOther("skill");
            document.querySelectorAll('[id^=otherskill]')[document.querySelectorAll('[id^=otherskill]').length -1].id=item.name;
          }
          document.querySelector(`#${item.name} ._name`).value=item.txt;
        }
        if (jj.rolling_mint.skill_type==1) {
          if (item.name.startsWith("otherskill")) {
            document.querySelector(`#${item.name} .skill_name>span>.add`).value=item.default;
          } else {
            document.querySelector(`#${item.name}`).default=item.default;
          }
          document.querySelector(`#${item.name} .sp`).value=item.sp;
          document.querySelector(`#${item.name} .sp-add`).value=item["sp-add"];
        } else {
          document.querySelector(`#${item.name} .value`).value=skills[item.name].current;
        }
      });
    }
  } catch (err) {console.log(err)}
  } else {
    alert("불러온 파일이 캐릭터시트가 아닙니다.");
  }
}

function importButton () {
  const file = document.getElementById("import_file").files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    load(data);
    if (document.querySelector("[name='skill-type']").value==1) {
      document.querySelectorAll(".skills>.content>div[id]>input .sp, .skills>.content>div[id]>input .sp-add").forEach((item)=>{clacSkillValue(item)});
    }
  }
  reader.readAsText(file);
  optionSkill(document.querySelector("[name='skill-type']:checked").value);
}
function resetSheet (tg) {
  tg.A.forEach((item,ind)=>{
    if (0 <= ind && ind < 8) {
      document.querySelector(`#${item}${tg.A_address}`).value=50;
    } else {
      document.querySelector(`#${item}${tg.A_address}`).value=null;
    }
  });
  tg.B.forEach((item)=>{
    document.querySelector(`#${item}${tg.B_address}`).value=null
  });
  tg.C.forEach((item)=>{
    document.querySelector(`#${item}`).value=null;
  });

  // 체크박스 초기화
  document.querySelectorAll("input[type='checkbox']").forEach((item)=>{
    item.checked=false;
  });
  // 추가스킬, 추가무기란 제거
  document.querySelectorAll(".skills .content>div[id^=otherskill], .weapons [id^=weapon]").forEach((item,ind)=>{
    if(ind>0) item.remove();
  });
  // 스킬 초기화
  document.querySelectorAll(".skills>.content>div[id]>input:not([type='checkbox'])").forEach((itemInput)=>{
    if (itemInput.classList.contains("value")) {
      itemInput.removeAttribute("readonly");
      try {
        let default_ = itemInput.parentElement.querySelector(".skill_name").attributes.default.value;
        itemInput.value = default_;
      } catch (err) {
        console.log(err);
        itemInput.value = null;
      }
    } else {
      itemInput.value = null;
    }
    itemInput.attributes.readonly=true;
  });

  
  startFunc();
}
// DESIGN FUNCTIONS