window.onload = function () { 
  document.getElementById("addRow").addEventListener("click",function(){
  var cloneNode = document.querySelector("#insane+.tabCon tbody.cont tr").cloneNode(true);
  document.querySelector("#insane+.tabCon tbody.cont").append(cloneNode);
  var newNode = document.querySelector("#insane+.tabCon tbody.cont tr:last-of-type");
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
  var stepRows = document.querySelectorAll("#insane+.tabCon tbody.cont tr");
  stepRows.forEach(function(value,index,arr) {
  if (index+1 > 2) {
  value.querySelector("td").childNodes[0].textContent=index+1;// = index+1;
  }
  });
  }
  // 다운로드 (의식시트)
  document.getElementById("down").onclick = function(){
  var target = document.querySelector('input[name="tabmenu"]:checked+.tabCon .content');
  var fileName = document.querySelector('input[name="tabmenu"]:checked').value+"_"+document.querySelector('input[name="tabmenu"]:checked+.tabCon .inputbox').innerHTML;
  domtoimage.toBlob(target)
  .then(function (blob) {
  window.saveAs(blob, fileName+'.png');
  });
  }
  // 다운로드 (핸드아웃)
  document.getElementById("downHO").onclick = function(){
    const targetArr = Array.from(document.querySelectorAll('.item .ho-output>div'));
    targetArr.map((target,i)=>{
      const nm = Math.ceil((i+1)/2);
      let fileName = document.querySelector(`.content>.item:nth-of-type(${1+nm})>input.front-1`).value;
      if(target.classList.contains("ho-back")){
        fileName = fileName+"_뒷면";
        target.querySelector(".ho-box-2>img").src="data:image/png;base64,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";
      }
      domtoimage.toBlob(target,{cacheBuster: false})
      .then(function (blob) {
        saveAs(blob, "핸드아웃_"+fileName+'.png')});
    })
  };

  //에디터로 복사
  document.querySelector("#copy").addEventListener('click',()=>{
  document.querySelectorAll("td>span").forEach(function(val){
  val.display="none";
  })
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
        tg.querySelector(".ho-box-2>img").src = "https://imgur.com/4MJ4Ar0.png";
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
  
  function selectRange(obj) {
  if (window.getSelection) {
  var selected = window.getSelection();
  selected.selectAllChildren(obj);
  } else if (document.body.createTextRange) {
  var range = document.body.createTextRange();
  range.moveToElementText(obj);
  range.select();
  }
  };

  document.getElementById("addHo").addEventListener("click",function(){
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
    document.getElementById("down").onclick = function(){
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
}