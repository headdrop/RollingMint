/*!
   * Rolling Mint
   * RollingMint
   *
   * https://headdrop.github.io/RollingMint/
   *
   * by headdrop
   */

// 실행
$(function () {
  $("#rule").on("change",selectRule);
  document.getElementById("download").addEventListener("click",downloadCss);
  document.querySelector(".custom .apply").addEventListener('click',()=>{
    customCss();
    setTimeout(function() {checkOpt() }, 800);
  });
  document.querySelector(".preset .apply").addEventListener("click",()=>{
    var num =presetStyle();
    setTimeout(()=>preset(num),1);
  });
  $("[name='presetSelect']").on("change",previewImage);
});

// 2-1. rule select
function selectRule () {
  let ruleList = document.getElementById("rule");
  let ruleName = ruleList.options[document.getElementById("rule").selectedIndex].text;
  let index = ruleList.selectedIndex;
  //rulelist
  let rule1, rule2, rule3;

  rule1 = ["Roll20 기본","Theme 2"]; //인세인 (r1_t1, r1_t2)
  rule2 = rule3 = ["Roll20 기본"]; // CoC (r2_t1), 마기로기(r3_t1)
  let rule = [rule1, rule2, rule3];
  document.getElementById("theme").innerHTML='';
  if (index!==0) { // 인덱스 0이아니면
    let selectedRule =  //룰 표 템플릿 추가
    // 인세인
    (index===1) ? `<div class="sheet-rolltemplate-Ninpo"><div class="sheet-bordered"><div class="sheet-vtop"><div class="sheet-blacklabel sheet-top" style="width: 80%"><span class="sheet-big">PC Roll 기본공격</span><span>(공격)</span></div><div class="sheet-resright"><span class="inlinerollresult showtip tipsy-n-right fullcrit" title="Rolling 2d6 =3+6">9</span></div></div><div class="sheet-myrow"><span class="sheet-lbl sheet-bold" data-i18n="assigned-skill-z">지정특기: </span><span class="sheet-notes sheet-inl">파괴  </span></div><div class="sheet-myrow"><span class="sheet-lbl sheet-bold" data-i18n="target-z">목표치: </span><span class="sheet-notes sheet-inl">8</span></div><div class="sheet-desc"><span class="sheet-notes">목표 1명을 선택해서 명중판정을 한다. 명중판정이 성공하고, 목표가 회피판정에 실패하면 1D6점 대미지.</span></div></div></div>`:
    // CoC
    (index===2) ? `<div class="sheet-rolltemplate-coc-1"><table><caption>SAN Roll</caption><tbody><tr><td class="sheet-template_label" data-i18n="value">기준치:</td><td class="sheet-template_value"><span class="inlinerollresult showtip tipsy-n-right" title="Rolling 50 = 50">50</span>/<span class="inlinerollresult showtip tipsy-n-right" title="Rolling floor(50/2) = floor(50/2)">25</span>/<span class="inlinerollresult showtip tipsy-n-right" title="Rolling floor(50/5) = floor(50/5)">10</span></td></tr><tr><td class="sheet-template_label" data-i18n="rolled">굴림:</td><td class="sheet-template_value"><span class="inlinerollresult showtip tipsy-n-right" title="Rolling 1d100 = (<span class=&quot;basicdiceroll&quot;>44</span>)">44</span></td></tr><tr style="background: #bebebe"><td class="sheet-template_label" data-i18n="result">판정결과:</td><td style="background: darkgreen" class="sheet-template_value" data-i18n="success">보통 성공</td></tr></tbody></table></div>
    </div><div class="message general">
    <div class="sheet-rolltemplate-coc"><table><caption>근접전(격투)</caption><tbody><tr><td class="sheet-template_label" data-i18n="value">기준치:</td><td class="sheet-template_value"><span class="inlinerollresult showtip tipsy-n-right" original-title="Rolling 25 = 25">25</span>/<span class="inlinerollresult showtip tipsy-n-right" original-title="Rolling floor(25/2) = floor(25/2)">12</span>/<span class="inlinerollresult showtip tipsy-n-right" original-title="Rolling floor(25/5) = floor(25/5)">5</span></td></tr><tr><td class="sheet-template_label" data-i18n="rolled">굴림:</td><td class="sheet-template_value"><span class="inlinerollresult showtip tipsy-n-right" original-title="<img src=&quot;/images/quantumrollwhite.png&quot; class=&quot;inlineqroll&quot;> Rolling 1d100 = (<span class=&quot;basicdiceroll&quot;>58</span>)">58</span>, <span class="inlinerollresult showtip tipsy-n-right" original-title="<img src=&quot;/images/quantumrollwhite.png&quot; class=&quot;inlineqroll&quot;> Rolling 1d100 = (<span class=&quot;basicdiceroll&quot;>21</span>)">21</span>, <span class="inlinerollresult showtip tipsy-n-right" original-title="<img src=&quot;/images/quantumrollwhite.png&quot; class=&quot;inlineqroll&quot;> Rolling 1d100 = (<span class=&quot;basicdiceroll&quot;>76</span>)">76</span></td></tr><tr style="background: #dff0d8"><td class="sheet-template_label">+2:</td><td class="sheet-template_value" data-i18n="success">보통 성공</td></tr><tr style="background: #d9edf7"><td class="sheet-template_label">+1:</td><td class="sheet-template_value" data-i18n="success">보통 성공</td></tr><tr style="background: #d3d3d3"><td class="sheet-template_label">&nbsp;&nbsp;0:</td><td class="sheet-template_value" data-i18n="fail">실패</td></tr><tr style="background: #fcf8e3"><td class="sheet-template_label">-1:</td><td class="sheet-template_value" data-i18n="fail">실패</td></tr><tr style="background: #f2dede"><td class="sheet-template_label">-2:</td><td class="sheet-template_value" data-i18n="fail">실패</td></tr></tbody></table></div>`:

    (index===3) ? `<div class="sheet-rolltemplate-Magic">
		<div class="sheet-template-top">
			<div class="sheet-left"></div>
			<div class="sheet-center"></div>
			<div class="sheet-right"></div>
		</div>
		<div class="sheet-template-middle">
			<div class="sheet-left"></div>
			<div class="sheet-center">
				<div class="sheet-title">
					캐릭터 이름
				</div>
				<div class="sheet-divider"></div>
				<div class="sheet-skillname">긴급 소환</div>
				<div class="sheet-divider"></div>
				<div class="sheet-random sheet-button">
				<div>
					<span class="sheet-area" data-i18n="fluid-0">가변(전체)</span>
											<span data-i18n="illusion">환각</span>
					</div>
										</div>
				<div class="sheet-target">
					가변(전체)
					<span class="sheet-dot"> · </span>
						<span class="sheet-lbl sheet-bold" data-i18n="target">목표치</span>
						<span class="sheet-mdl"><span class="inlinerollresult showtip tipsy-n-right" original-title="Rolling 0 = 0">9</span></span>
				</div>
				<div class="sheet-spec">
					<span>소환</span>
					<span class="sheet-dot"> · </span>
					<span>없음</span>
				</div>
				<div class="sheet-desc">
					무작위로 특기 하나를 선택한다. 그것이 지정특기가 된다. 지정특기 판정에 성공하면 「(특기명)의 정령」을 한 개체 소환할 수 있다.
				</div>
				<div class="sheet-recite">
					향기로운 바람이여, 회답하는 이를 옮겨오라!
				</div>
			</div>
			<div class="sheet-right"></div>
		</div>
		<div class="sheet-template-bottom">
			<div class="sheet-left"></div>
			<div class="sheet-center"></div>
			<div class="sheet-right"></div>
		</div>
	</div>
  <div class="sheet-rolltemplate-modulation-table">
	<div class="sheet-template-top">
		<div class="sheet-left"></div>
		<div class="sheet-center"></div>
		<div class="sheet-right"></div>
	</div>
	<div class="sheet-template-middle">
		<div class="sheet-left"></div>
		<div class="sheet-center">
			<div class="sheet-title">
				<span data-i18n="modulation_table">표</span></div>
			<div class="sheet-divider"></div>
			<div class="sheet-subtitle">
				  <span class="sheet-myrow"><b>제목</b></span>
			</div>
			<div class="sheet-divider"></div>
			<div class="sheet-desc">(<span class="inlinerollresult showtip tipsy-n-right fullfail" title="Rolling 1D6 = (<span class=&quot;basicdiceroll critfail &quot;>1</span>)">1</span>)
				  <span class="sheet-myrow">내용이 출력되는 공간입니다.</span>
			</div>
		</div>
		<div class="sheet-right"></div>
	</div>
	<div class="sheet-template-bottom">
		<div class="sheet-left"></div>
		<div class="sheet-center"></div>
		<div class="sheet-right"></div>
	</div>
</div>
  ` :
    '';
    var template = `<div class="message general"><div class="spacer"></div><div class="avatar" aria-hidden="true"></div><span class="tstamp" aria-hidden="true">March 13, 2021 8:34PM</span><span class="by">롤 템플릿 미리보기</span>${selectedRule}</div>`;

    rule[index-1].forEach((element,i) => {
          let checkboxRule =`<il><input type="radio" name="${ruleName}" id="r${index}_t${i+1}"><label for="r${index}_t${i+1}">${element}</label></il> `;
        $("#theme").append(checkboxRule);
        if (i===0) {$(`#r${index}_t${i+1}`).prop("checked",true);
        }
    });
    theme();
  } else {var template=''}
  document.getElementById("ruleExample").innerHTML = template;
  $("#theme input").on("change",theme);
}
// 2-2. theme select
function theme () {
  let link = document.createElement("link");
  try {document.getElementById("rule-css").remove()} catch {}
  let checkId = document.querySelector("#theme :checked").id;

  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `./theme/${checkId}.css`;
  link.id = "rule-css"
  document.body.appendChild(link);
}

// 3. file uploader & custom sheet
const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create( inputElement );

function customCss () {
  $("style[id]").remove(); // 기존 초기화
  var regex = /(?<=\/\*\().+?(?=\)\*\/)/s;
  let editingCss = document.getElementById("editing").value;
  if (editingCss!='') { // 입력한 css 가 있을 경우 css 파일 연결 처리
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id="custom-input-css";
    style.innerHTML = editingCss;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  for (var i=0,  pending = Promise.resolve(); i<pond.getFiles().length; i++) {
    var files = pond.getFile(i).file;
    const fileid = pond.getFile(i).id;
    const pending = new Promise((resolve, reject) => { 
      var reader = new FileReader();
      reader.onload = function() {
        var text = reader.result;
        if(text.indexOf('t1n4i2m4g5n8i9l7lor')!= -1) { // 확인 id (option) 있는 css 파일이면 이 페이지에서 다운로드받은 커스텀 파일로 간주
          if(text.indexOf('/* 이미지 변환')!= -1) {
            var regex2 = /\/\* 이미지 변환([\s\S]*?)\*\//gi
            var imgVal = regex2.exec(text)[1];
            var imgObj = JSON.parse(imgVal);
            
            for (let key in imgObj) {
              const val = imgObj[key];
              var beforeImg = document.querySelector("#imgList img.beforeimg[src='"+key+"']");
              if (beforeImg==null) {
                try {
                  var asName = document.querySelector(`#dropdownUrl option[value='${key}']`).innerText;
                  var changeImgInput =
                    `<div class="changeImg-box"><div><span>${asName}의 프로필 이미지</span><i class="material-icons-round close">close</i></div><input class="input-area" type="url" placeholder="외부 이미지 링크를 입력해주세요." onfocus="this.placeholder=''" onblur="this.placeholder='외부 이미지 링크를 입력해주세요.'" value="${val}"><img class="beforeimg" src="${key}"/><div class="preview-icon"><label class="material-icons-round">photo_size_select_actual<input type="checkbox"></label><img src=""></div></div>`;
                  document.getElementById("imgList").insertAdjacentHTML('beforeend',changeImgInput);
                  $("#dropdownUrl").next().find(`[data-value='${key}']`).addClass("disabled");
                } catch(e){console.log(e)}
              } else {
                beforeImg.previousSibling.value=val;
              } 
            }

          }
          //----------
          var optval = regex.exec(text)[0];
          var optObj =JSON.parse(optval); // 옵션 내용 객체
          let optarr = document.querySelectorAll(".glo-option input");
          for (var j=0; j<optarr.length; j++) {
            var checkval = (optObj.option.split(",")[j]==="true") ? true : false;
            optarr[j].checked=checkval;
          }
          tableColor(optObj.table); // 테이블
          for (i of styleLog) {
            if(i.selectorText === ".sheet-rolltemplate-default table") {i.style.borderColor = optObj.table}
            else if(i.selectorText === ".sheet-rolltemplate-default caption") {i.style.backgroundColor = optObj.table}
          }
          $("#rule").val(optObj.rule); // 룰
          selectRule();
          $(".nice-select .current")[0].innerText=$(`option[value=${optObj.rule}]`)[0].innerText;
          if (optObj.rule==="RULE") {} else {
          document.getElementById(optObj.theme).checked="true";
          }
          // message
          cssChange(".message","color",optObj.general.color);
          cssChange(".message","background-color",optObj.general.bg);
          cssChange(".message .spacer","background-color",optObj.general.spacer);
          // desc
          cssChange(".message.desc","color",optObj.desc.color);
          cssChange(".message.desc","background-color",optObj.desc.bg);
          cssChange(".message.desc .spacer","background-color",optObj.desc.spacer);
          // emote
          cssChange(".message.emote","color",optObj.emote.color);
          cssChange(".message.emote","background-color",optObj.emote.bg);
          cssChange(".message.emote .spacer","background-color",optObj.emote.spacer);
          // you
          cssChange(".message.you","color",optObj.you.color);
          cssChange(".message.you","background-color",optObj.you.bg);
          cssChange(".message.you .spacer","background-color",optObj.you.spacer);
          // whisper
          cssChange(".message.whisper","color",optObj.whisper.color);
          cssChange(".message.whisper","background-color",optObj.whisper.bg);
          cssChange(".message.whisper .spacer","background-color",optObj.whisper.spacer);
          // cp 새로만들기
          makeFullGlobalCp();
        }
        // stylesheet 연결
        var style = document.createElement('style');
        style.type = 'text/css';
        style.id=fileid;
        style.innerHTML = text;
        document.getElementsByTagName('head')[0].appendChild(style);
      }; 
      reader.readAsText(files);
  })
  .then((data) => {
  });
  };
}


// css 파일 다운로드
function downloadCss () {
  var gloArr = [];
  for (var i=0; i<$(".glo-option input").length; i++) {
      gloArr.push($(".glo-option input")[i].checked);
  }
  var rule = $("#rule").val();
  var thm = rule==="RULE" ? '' :document.querySelector("#theme :checked").id;
  var table = $("#defaultTable").val()==="" ? "rgb(112, 32, 130)" : $("#defaultTable").val();
  const makecss1 = `/* Rolling Mint by headdrop (@hdtrpg)
  OPTION EXISTED identification code t1n4i2m4g5n8i9l7lor
*/
  
  /*( {
  "option" : "${gloArr.join(",")}",
  "table" : "${table}",
  "rule" : "${rule}",
  "theme" : "${thm}",
  
  "general" : {"color":"${styleNew[0].style.color}", "bg":"${styleNew[0].style.backgroundColor}","spacer":"${styleNew[1].style.backgroundColor}"},
  "desc" : {"color":"${styleNew[2].style.color}", "bg":"${styleNew[2].style.backgroundColor}","spacer":"${styleNew[3].style.backgroundColor}"},
  "emote" : {"color":"${styleNew[4].style.color}", "bg":"${styleNew[4].style.backgroundColor}","spacer":"${styleNew[5].style.backgroundColor}"},
  "you" : {"color":"${styleNew[6].style.color}", "bg":"${styleNew[6].style.backgroundColor}","spacer":"${styleNew[7].style.backgroundColor}"},
  "whisper" : {"color":"${styleNew[8].style.color}", "bg":"${styleNew[8].style.backgroundColor}","spacer":"${styleNew[9].style.backgroundColor}"}
  } )*/
  `;
  var charStyleArr=[];
  for (var i=10; i<styleNew.length; i++) { // 캐릭터별 설정
    if (styleNew[i].cssText.search('#')!=-1) {
      charStyleArr.push(styleNew[i].cssText);
    }
  }
  const makecss2 = charStyleArr.join("\n"); 
  //---------
  let css3_arr = document.querySelectorAll("#imgList .changeImg-box");
  let css3_result={};
  css3_arr.forEach((val,key)=>{
    css3_result[val.querySelector(".beforeimg").src] =val.querySelector(".input-area").value;
  })
  var makecss3 = "/* 이미지 변환" + JSON.stringify(css3_result,null,2) + "*/";
  console.log(makecss3);

  const filename = 'roll20 log mint custom.css';
  const data = makecss1 +"\n\r"+makecss2+"\n\r"+makecss3;
  saveToFile_Chrome(filename,data);
}
function saveToFile_Chrome(fileName, content) {
  var blob = new Blob([content], { type: 'text/css' });
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


// other preset
function presetStyle () {
  var checkId = document.querySelector(".preset :checked").id;
  try {document.getElementById("preset-css").remove();} catch {}
  if (checkId==="pre_0") return 0;    //기본일때 아무것도 하지 않음

  let link = document.createElement("link");
  var num = /\d/gi.exec(checkId)[0];
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `./theme/${checkId}.css`;
  link.id = "preset-css"
  document.body.appendChild(link);
  return num;
}


function preset (num) {
  var setting = document.querySelectorAll(".glo-option input");
  setting.forEach((it)=>it.disabled=false);
  switch(num) {
    case 0 :
      inputHTML();
    break;
    case "1" :
      setting[0].disabled = true;
      setting[2].disabled = true;

      $("#log-content  .spacer").remove();
      
      $("#log-content .by").each((ind,obj)=>{
        obj.textContent = obj.textContent.slice(0,-1);
        obj.previousSibling.previousSibling.appendChild(obj);
      });
      
      document.querySelectorAll("#log-content .general[id]").forEach(function(obj){
        var p = document.createElement("p");
        var place = obj.appendChild(p);
        var nodeArr = Array.prototype.slice.call(obj.childNodes);
        var item = obj.lastChild;
        try {
          for (var val of nodeArr) {
            if(val.className!=="avatar" && val.className!=="tstamp" && val.localName!='p') place.append(val)}
          if (obj.id===obj.previousSibling.id && obj.getAttribute('data-avatarurl')==null) {
            if (obj.previousSibling.getAttribute('data-avatarurl')==null) {
              $(obj).prevUntil('[data-avatarurl]').last().prev().append(item);
              obj.remove();
            } else if (obj.previousSibling.classList.contains('emote')||obj.previousSibling.classList.contains('desc')) {
              //$(obj).append(item);
            } else {
              $(obj).prev().append(item);
              obj.remove();
            }
          }
        } catch {}
        
      });
      
      $(".example .avatar").css("display","none");
      setTimeout(()=>{
        $("#log-content .general .avatar").each((ind,elm)=>{
          var avtHeight = $(elm).css("height");
          $(elm).parent().css("min-height",avtHeight)})
      },1)
    break;
  }
}
//
function previewImage () {
  let checkId = document.querySelector(".preset :checked").id;
  let img = new Image();
  let box = document.getElementById("preset-preview");
  box.childNodes[0].remove();
  box.removeEventListener("click",zoomModal);
  if (checkId==="pre_0") {
    let span = '<span>테마를 선택하면 해당 테마의 미리보기가 이 창에 나타납니다.</span>'
    box.innerHTML=span;
    return 0;
  } else {
    img.src=`./theme/${checkId}.png`;
    box.appendChild(img);
    box.addEventListener("click",zoomModal);
  }
}
function zoomModal () {
  let preImg = new Image();
  let imgSrc = this.querySelector("img").src;
  preImg.src = imgSrc;
  $(".modal #preview-modal .modal-content").html(preImg);
  modaltog("#preview-modal");
}

function modaltog (divsel) {
  if (divsel==undefined) { // 인수 없으면 modal 창 close
    $(".modal").fadeOut(200);
    setTimeout(function(){
      $(".modal>div").attr('style','');
    },1000);
    if (document.getElementById("page")!=null) document.getElementById("page").remove(); // page 표시 혹시 있으면 지우기
  } else { // 인수 있으면 그 인수 선택자를 가진 modal 창 open
    $(".modal").fadeIn(200);
    document.querySelector(divsel).style.visibility="visible";
  }
  
}