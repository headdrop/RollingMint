window.onload = function () {
  document.getElementById("addRow").addEventListener("click",function(){
  var cloneNode = document.querySelector("#insaneRitual+.tabCon tbody.cont tr").cloneNode(true);
  document.querySelector("#insaneRitual+.tabCon tbody.cont").append(cloneNode);
  var newNode = document.querySelector("#insaneRitual+.tabCon tbody.cont tr:last-of-type");
  newNode.querySelectorAll("td").forEach(function(value,index){
  if (index>0) value.textContent="";
  });
  var rowbtn = document.createElement("span");
  rowbtn.innerText = "X";
  newNode.querySelector("td").append(rowbtn);
  newNode.querySelector("td span").addEventListener("click",function(){
  this.parentNode.parentNode.remove();
  step();
  },{ once: true });
  step();
  });
  //function
  function step () {
  var stepRows = document.querySelectorAll("#insaneRitual+.tabCon tbody.cont tr");
  stepRows.forEach(function(value,index,arr) {
  if (index+1 > 2) {
  value.querySelector("td").childNodes[0].textContent=index+1;// = index+1;
  }
  });
  }

  // 다운로드 (의식시트)
  document.getElementById("downRitual").onclick = function(){
  var target = document.querySelector('input[name="tabmenu"]:checked+.tabCon .content');
  var fileName = document.querySelector('input[name="tabmenu"]:checked').value+"_"+document.querySelector('input[name="tabmenu"]:checked+.tabCon .inputbox').innerHTML;
  // domtoimage.toBlob(target)
  // .then(function (blob) {
  // window.saveAs(blob, fileName+'.png');
  // });
  html2canvas(target).then(function(canvas) {
  var imgData = canvas.toDataURL();
  downloadURL(imgData,fileName+".png");
  });

  }
  // 다운로드 (핸드아웃)
  document.getElementById("downHO").addEventListener("click",downAllImg);
  // 다운로드 (핸드아웃 VTT)
  document.getElementById("downVTTHO").addEventListener("click",downVTT);




  //에디터로 복사
  document.querySelector("#copy").addEventListener('click',()=>{
  document.querySelectorAll("td>span").forEach(function(val){
  val.display="none";
  });
  var target = document.querySelector('input[name="tabmenu"]:checked+.tabCon .content');
  selectRange(target);
  document.execCommand("copy");
  alert("복사가 완료되었습니다. roll20 핸드아웃 편집 창에 붙여넣기하세요.\\n복사한 표는 이 페이지에 적용된 글꼴이 적용되지 않습니다.")
  });
  // 복사 (2)
  function sync (newNode) { // 내용 입력 싱크
    if (newNode==undefined) {newNode=document}
    newNode.querySelectorAll("#insaneHO+.tabCon .item input, #insaneHO+.tabCon .item textarea").forEach((val,ind)=>{
      val.addEventListener('change',(e)=>{
        switch(val.className) {
          case 'front-1' :
            val.parentNode.children[5].querySelector(".ho-box>table td:nth-child(2)").textContent = val.value;
            break;
          case 'front-2' :
            val.parentNode.children[5].querySelector(".ho-box-content").innerText = val.value;
            break;
          case 'back-1' :
            val.parentNode.children[6].querySelector(".ho-box>table td:nth-child(2").textContent = val.value;
            break;
          case 'back-2' :
            val.parentNode.children[6].querySelector(".ho-box-content").innerText = val.value;
            break;
        }
      })
    })
    newNode.querySelectorAll(".copy").forEach(val=>{
      val.addEventListener('click',(e)=>{
        var page = e.target.classList[2].replace("c-",'');
        var tg = e.target.parentNode.parentNode.getElementsByClassName(page)[0];
        try {
          tg.querySelector(".ho-box-2>img").src = "https://imgur.com/4MJ4Ar0.png";
        } catch (err) {}
        selectRange(tg);
        document.execCommand("copy");
        alert("복사가 완료되었습니다. roll20 핸드아웃 편집 창에 붙여넣기하세요.")
      });
    })
  }
  
  document.getElementsByName('hoWidth').forEach((val,ind)=>{
    val.addEventListener('change',(e)=>{
      if (ind==0) {
        document.getElementById("width").innerHTML=`#insaneHO + .tabCon .ho-output > div {width:250px;min-width:'unset'}`;
      } else { // 100%
        document.getElementById("width").innerHTML=`#insaneHO + .tabCon .ho-output > div {min-width:100%}`;
      }
    })
  })
  
  // ------- } onload 끝

  document.getElementById("addHO").addEventListener("click",function(){
    var cloneNode = document.querySelector("#insaneHO+.tabCon .item").cloneNode(true);
    document.querySelector("#insaneHO+.tabCon .content").append(cloneNode);
    var newNode = document.querySelector("#insaneHO+.tabCon .item:last-child");
    newNode.children[0].value="";
    newNode.children[1].value="앞면내용";
    newNode.children[2].value="";
    newNode.children[3].value="뒷면내용";
    newNode.querySelector(".remove").addEventListener("click",function(){
      this.parentNode.parentNode.remove();
    },{ once: true });
    document.getElementById("downRitual").onclick = function(){
      var target = document.querySelector('input[name="tabmenu"]:checked+.tabCon .content');
      var fileName = document.querySelector('input[name="tabmenu"]:checked').value+"_"+document.querySelector('input[name="tabmenu"]:checked+.tabCon .inputbox').innerHTML;
      domtoimage.toBlob(target)
      .then(function (blob) {
      window.saveAs(blob, fileName+'.png');
      });
      }
    sync(newNode);
  });
  sync();

  // 광기카드
  document.getElementById("addCard").addEventListener("click",addCard);
  sampleCard = document.querySelector("#insaneCard+.tabCon .item").cloneNode(true);
  // 광기카드 폰트
  document.querySelector("#fontName").addEventListener("change",(e)=>{
    const fontName = e.target.value;
    document.getElementById("font").innerHTML=`.ho-card * {font-family: '${fontName}';}`;
    document.getElementById("fontName").style.fontFamily = fontName;
  });
  // 파일 인풋
  document.getElementById("input_import_csv").addEventListener("change",changeCardInput);
  // 카드 싱크
  cardSyncEventAdd(document.querySelector("#insaneCard+.tabCon .item"));
}
// start ----

function downloadURL (uri,name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}
function changeCardInput (e) {
  var filename = document.getElementById("input_import_csv_filename");
  if (e.target.files[0]===undefined) {
    filename.value = "";
    filename.previousElementSibling.classList.remove("prefilled");
  } else {
    filename.value = e.target.files[0].name;
    filename.previousElementSibling.classList.add("prefilled");
  }
}
function uploadCardData () {
  console.log("uploadCardData");

  const file = document.getElementById("input_import_csv").files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (e) => {
    document.querySelectorAll("#insaneCard+.tabCon .item").forEach((item)=>{item.remove()});

    csv().fromString(e.target.result).then((dataObj)=> {
      for (let item of dataObj) {
        addCard();
        let target = document.querySelector("#insaneCard+.tabCon .content-bottom .item:last-child");
        target.querySelector(".card-1").value = item.name;
        target.querySelector(".card-2").value = item.trigger;
        target.querySelector(".card-3").value = item.effect;
        target.querySelector(".ho-box-title:first-child>div:last-of-type").textContent = item.name;
        target.querySelector(".ho-box-title:nth-child(2)>div:last-of-type").textContent = item.trigger;
        target.querySelector(".ho-box-content").innerText = item.effect;
      }
      return dataObj;
    });
  });
  reader.readAsText(file);
  
}

function selectRange(obj) {
  if (window.getSelection) {
  var selected = window.getSelection();
  selected.selectAllChildren(obj);
  } else if (document.body.createTextRange) {
  var range = document.body.createTextRange();
  range.moveToElementText(obj);
  range.select();
  return range.select();
  }
};

// 광기카드 샘플
var sampleCard;
function addCard () {
  document.querySelector("#insaneCard+.tabCon .content-bottom").append(sampleCard.cloneNode(true));
  const item = document.querySelector("#insaneCard+.tabCon .content-bottom .item:last-child");
  item.querySelector(".remove").addEventListener("click",function(){
    this.parentNode.parentNode.remove();
  },{ once: true });
  cardSyncEventAdd(item);
}

function cardSyncEventAdd (item) {
  item.querySelector(".card-1").addEventListener("change",function(){
    item.querySelector(".ho-box-title:first-child>div:last-of-type").textContent = this.value;
  });
  item.querySelector(".card-2").addEventListener("change",function(){
    item.querySelector(".ho-box-title:nth-child(2)>div:last-of-type").textContent = this.value;
  });
  item.querySelector(".card-3").addEventListener("change",function(){
    item.querySelector(".ho-box-content").innerText = this.value;
  });

}

// 전체 다운로드 함수
function downAllImg (fontname = 'Pretendard') {
  fontname = document.querySelector("#fontName :checked").value;
  const type = document.querySelector('input[name="tabmenu"]:checked').id;
  const targetArr = Array.from(document.querySelectorAll(`#${type}+.tabCon .item .ho-output>div`));

  targetArr.map((target,i)=>{
    if (target.querySelector("img")) {
      target.querySelector("img").src=handprint;
    }
    let fileName;
    if (type==="insaneHO") {
      const nm = Math.ceil((i+1)/2);
      fileName = document.querySelector(`.content>.item:nth-of-type(${1+nm})>input.front-1`).value;
      fileName = "핸드아웃_"+fileName;
      if(target.classList.contains("ho-back")){
        fileName = fileName+"_뒷면";
      }
    } else if (type==="insaneCard") {
      fileName = target.querySelector(".ho-box-title:first-child>div:last-of-type").textContent;
      fileName = "광기카드_"+fileName;
    }
    
    domtoimage.toBlob(target,{cacheBuster: false})
    .then(function (blob) {
      saveAs(blob, fileName+'.png')
    });
  });
}

// 핸드아웃 다운로드 이벤트
function downVTT () {
  document.querySelectorAll("#insaneHO+.tabCon .item").forEach((item)=>{
    
    handoutToVTT(item);
  });

  
}

// 핸드아웃 VTT JSON 으로 다운로드
function handoutToVTT (item) {
  if (item.querySelector("input.front-1").value=="") {
    alert("핸드아웃 이름을 입력하세요.");
  }
  else {
    var wid='';
    if (document.querySelector("[name='hoWidth']:checked").value=="100") wid = "min-width:100% ";
    const honame = item.querySelector("input.front-1").value;
    var hoFnotes, hoBshock, hoBnotes;
    hoFnotes = item.querySelector(".ho-output.front .ho-box-content").innerHTML;
    hoBshock = item.querySelector("input.back-1").value;
    hoBnotes = item.querySelector(".ho-output.back .ho-box-content").innerHTML;
    const noteF = `<div style="display: inline-block ; border: 1px solid black ; color: rgb( 0 , 0 , 0 ) ; background-color : white ; padding: 4px ; width: 250px ; ${wid}; font-size: 16px"><div style="font-family: &#34;im fell dw pica&#34; , &#34;times new roman&#34; ; line-height: normal ; text-align: center ; font-size: 24px ; font-weight: ">Handout</div><div style="font-family: &#34;unset&#34; ; line-height: normal ; border: 3px solid black ; padding: 2px ; text-align: "><div style="font-family: &#34;unset&#34; ; line-height: normal ; padding-bottom: 1px ; border: 1px solid black"><table style="font-family: &#34;helvetica neue&#34; , &#34;helvetica&#34; , &#34;arial&#34; , sans-serif ; padding: 0px ; border-width:  ; border-style: none ; border-color:  ; margin-bottom: 0px ; line-height: normal"><tbody style="padding: 0px ; border: none ; line-height: normal"><tr style="padding: 0px ; border: none ; display:  ; line-height: normal"><td style="padding: 3px ; border-top: none ; border-right-color: black ; border-bottom: none ; border-left: none ; vertical-align: middle ; line-height: normal ; text-align: center ; width: 45px">이름</td><td style="padding: 3px ; border-width:  ; border-style: none ; border-color:  ; vertical-align: middle ; line-height: normal">${honame}</td></tr></tbody></table><div style="font-family: &#34;helvetica neue&#34; , &#34;helvetica&#34; , &#34;arial&#34; , sans-serif ; line-height: normal ; border-top: 1px solid black ; border-bottom: 1px solid black ; text-align: center">사명</div><div style="font-family: &#34;helvetica neue&#34; , &#34;helvetica&#34; , &#34;arial&#34; , sans-serif ; line-height: 22.5px ; text-align: justify ; padding: 1px 3px 0px ; margin-bottom: -1px ; background-image: linear-gradient( to right , transparent 0px , transparent 8px , white 8px , white 12px ) , linear-gradient( white 0px , white 44px , rgb( 136 , 136 , 136 ) , rgb( 136 , 136 , 136 ) ) ; background-size: 12px 45px ; background-repeat: repeat">${hoFnotes}</div></div></div></div>`;
    const noteB = `<div style="display: inline-block ; background-color: black ; border: 1px solid black ; padding: 4px ; width: 250px ; color: rgb( 0 , 0 , 0 ) ; font-size: 16px"><div style="font-family: &#34;im fell dw pica&#34; , &#34;times new roman&#34; ; line-height: normal ; text-align: center ; color: white ; font-size: 24px ; font-weight: ">Handout</div><div style="font-family: &#34;unset&#34; ; line-height: normal ; border: 3px solid white ; padding: 2px ; text-align: "><div style="font-family: &#34;helvetica neue&#34; , &#34;helvetica&#34; , &#34;arial&#34; , sans-serif ; line-height: normal ; text-align: center ; color: white ; border-bottom: 3px solid black">비밀</div><div style="font-family: &#34;helvetica neue&#34; , &#34;helvetica&#34; , &#34;arial&#34; , sans-serif ; line-height: normal ; padding-bottom: 1px ; background-color: white"><table style="padding: 0px ; border-width:  ; border-style: none ; border-color:  ; margin-bottom: 0px ; line-height: normal"><tbody style="padding: 0px ; border: none ; line-height: normal"><tr style="padding: 0px ; border: none ; display:  ; line-height: normal"><td style="padding: 3px ; border-top: none ; border-right-color: black ; border-bottom: none ; border-left: none ; vertical-align: middle ; line-height: normal ; text-align: center ; width: 45px">쇼크</td><td style="padding: 3px ; border-width:  ; border-style: none ; border-color:  ; vertical-align: middle ; line-height: normal">${hoBshock}</td></tr></tbody></table><div style="line-height: 22.5px ; text-align: justify ; padding: 1px 3px 0px ; margin-bottom: -1px ; background-image: linear-gradient( to right , transparent 0px , transparent 8px , white 8px , white 12px ) , linear-gradient( white 0px , white 44px , rgb( 136 , 136 , 136 ) , rgb( 136 , 136 , 136 ) ) ; background-size: 12px 45px ; background-repeat: repeat ; border-top: 1px solid black">${hoBnotes}</div></div><div style="font-family: &#34;kopubworldbatang&#34; , &#34;kopubbatang&#34; , &#34;batang&#34; ; line-height: normal ; color: rgb( 221 , 221 , 221 ) ; font-size: 12px ; padding: 4px 0px 1px ; text-align: center ; display: ">이 비밀을 스스로 밝힐 수는 없다<img src="https://imgsrv.roll20.net/?src=https%3A//imgur.com/4MJ4Ar0.png" style="font-family: &#34;helvetica neue&#34; , &#34;helvetica&#34; , &#34;arial&#34; , sans-serif ; line-height: normal ; margin-right: -10px ; width: 32px"></div></div></div>`;

    var output_front = {
      "schema_version": 3,
      "type": "handout",
      "handout": {
        "archived": false,
        "avatar": "",
        "controlledby": "",
        "inplayerjournals": "",
        "name": honame,
        "tags": "[]",
        "gmnotes": "",
        "notes": escape(noteF)
      }
    }
    hoBnotes = item.querySelector(".ho-output.back");
    var output_back = {
      "schema_version": 3,
      "type": "handout",
      "handout": {
        "archived": false,
        "avatar": "",
        "controlledby": "",
        "inplayerjournals": "",
        "name": honame+"🔒︎",
        "tags": "[]",
        "gmnotes": "",
        "notes": escape(noteB)
      }
    }
    const content_front = JSON.stringify(output_front);
    const content_back = JSON.stringify(output_back);
    saveToFile_Chrome(honame+".json",content_front);
    saveToFile_Chrome(honame+"🔒︎.json",content_back);
    // // 다운로드
    function saveToFile_Chrome(fileName, content) {
      var blob = new Blob([content], { type: 'text/JSON' });
      objURL = window.URL.createObjectURL(blob);
      // 이전에 생성된 메모리 해제
      if (window.__Xr_objURL_forCreatingFile__) {
          window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
      }
      window.__Xr_objURL_forCreatingFile__ = objURL;
      var a = document.createElement('a');
      a.download = fileName;
      a.href = objURL;
      a.click();
    }
    console.log(JSON.stringify(output_front));
  }
}


const handprint = "data:image/png;base64,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";

