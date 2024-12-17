const wpperBox = document.getElementById("wrapper");
const inputFiledGroup = document.getElementsByClassName("inputGroup")[0];
const allInput = document.querySelector("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registationForm = document.getElementById("registationForm");

const updateHelperText = (input,message,isValid) => {
    const inputGroup = input.parentElement;
    // 한개 input 테그에 부모테그 접근하는것
    //예시로 input테그를 저희가 userEmail로 접근하였다고 하면, 아래 테그들의 최상위테그를 의미한다
    const helperText = inputGroup.getElementsByClassName("helperText")[0];

    if (isValid) {
        inputGroup.classList.remove("invalid");
        inputGroup.classList.add("valid");
        helperText.style.visibility = "hidden";
    } else {
        inputGroup.classList.remove("valid");
        inputGroup.classList.add("invalid"); 
        helperText.style.visibility = "visible";
        helperText.innerText = message;
    }
    

};

// 알림이 사용되는것까지는 설정이 가능한데 언제사용디 되어야하나? 
//입력필드가 비어있는지 확인하는 함수기능을 생성

const checkEmptyInput = (input)=>{
    if(input.value.trim() ===""){
        //input 입력칸에 문자열중 띄어쓰기를 없애는 기능
        updateHelperText(input,"입력해주세요", false);
        return false;
    }else{
        // 입력이 있으면 도움말 삭제
        updateHelperText(input,"",true);
    }
}

//email 형식이 올바른지 확인하는 함수
// 이메일주소가 규칙에 맞게 작성이되어있는지 확인하는것
const validEmailFormat = (input)=>{
    const emailPattern =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(emailPattern.test(input.value.trim()) == true){
        updateHelperText(input,"",true);
    }else{
        updateHelperText(input,"유효한 이메일 주소를  부탁드립니다.",false);
        return false;
    }
    //정규식 > 골뱅이등 필수조건을 안넣었을떄 검사해가지고 true혹은 false를 리턴할수있다.
}

const checkPasswordStrength = (password) => {
    const strongPattern =/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if(strongPattern.test(password.value)=== true){
        updateHelperText(password,"비밀번호강도강함",true);
        return true;
    }else{
        updateHelperText(password,"비밀번호는8자이상이여하며,대문자,소문자,특수문자포함",false);
        return false;
    }
}

//비밀번호와 비밀번호확인입력칸이 같은지 확인
const validatePasswordMatch =(passwordInput,confirmPassword) => {
    if(passwordInput.value !== confirmPassword.value){
        updateHelperText(confirmPassword,"비밀번호가 일치하지 않습니다.",false);
    return false;
    }else{
        updateHelperText(confirmPassword,"",true);
        return true;
    }
}

//전화번호가 올바른지 확인하는 함수
const validatePhoneNumber = (input) => {
    const phonePattern =/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    if(phonePattern.test(input.value.trim())){
        updateHelperText(input,"",true);
        return true;
    }else{
        updateHelperText(input,"유요한 전화번호를 입력해주세요(예:010-1234-7890)",false)
        return false;
    }
}

//폼제출 입력버튼누르면 회원가입 진행될수있게 필드가 유효한지 확인하는 함수
//숙제검사에서 모든 항목을 검토하는것과 같다.
const validateForm =() =>{
    const isNicknameValied = checkEmptyInput(userNickname);
    const isEmailValied = validEmailFormat(userEmail);
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPassworldMatch = validatePasswordMatch(userPassword,confirmPassword);
    const isPhoneValied = validatePhoneNumber(userPhone);

    //모든 검사를 해서 모든 검사가 통과해야 회원가입버튼을 눌렀을때 회원가입이 진행되게끔한다.
  return isNicknameValied&&isEmailValied&&isPasswordStrong&&isPassworldMatch&&isPhoneValied
}

registationForm.addEventListener("submit",(e)=> {
    e.preventDefault();
    if(validateForm() == true){
        console.log("모든 필드가 유효합니다. 즉 사용이 가능합니다");
    }else{
        console.log("위 필드중 일부분이 에러가납니다");
    }
    console.log(e);
})

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        switch (input.id) {
            case 'nickname':
                checkEmptyInput(input);
                break;
            case 'email':
                validEmailFormat(input); // 함수 이름 수정
                break;
            case 'userPassword':
                checkPasswordStrength(input);
                break;
            case 'confirmPassword':
                validatePasswordMatch(userPassword, input); // 함수 호출 수정
                break;
            case 'phone':
                validatePhoneNumber(input); // case 'form' → 'phone' 수정
                break;
        }
    });
});
