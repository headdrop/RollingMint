
document.getElementById("font-size-tog").addEventListener('change',(tog)=>{
  var tg = tog.target;
  if (tg.checked) {
    tg.nextSibling.setAttribute("disabled",true);
    tg.nextSibling.value="";
  } else {
    tg.nextSibling.removeAttribute("disabled");
  }
});
document.querySelector("#log-paste").addEventListener('click',()=>{
  
  afterModify();
  var htmlContent = document.getElementById("editable").innerHTML;
  // htmlContent = htmlContent.replace(/class=".+?"/gi,'');
  htmlContent = htmlContent.replace(/(<div)((><br>)|(style="">))(<\/div>)/gi,'');
  
  document.getElementById("logdata").value=htmlContent;
  alert("준비가 완료되었습니다. 'HTML 코드 복사하기' 버튼을 누르세요.")
});

// 로그 후가공 함수
function afterModify () {
  var log = document.querySelectorAll("#editable .message");
  
  const fontTog = document.getElementById("font-size-tog").checked;
  const size = document.getElementById("font-size").value;
  log.forEach(message=>{
    // message.removeAttribute("class");
    message.removeAttribute("id");
    message.removeAttribute("data-avatarurl");
    
    if (fontTog) { // font size 사용하지않음 체크
      message.style.fontSize=null;
    } else { 
      message.style.fontSize=size+"px";
    }
  })
}

//복사
var clipboard = new ClipboardJS('#copy');
clipboard.on('success', function(e) {
  alert("로그를 복사했습니다. HTML 모드에서 붙여넣습니다.");
});
