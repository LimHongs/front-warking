const quoteDisplayArea = document.querySelector("#quoteContainer");
const currentQuote = document.querySelector("#quote");
const loadingSpinner = document.getElementById("loader");
const favoriteQuoteList = document.getElementById("quotePickList");
const nextQuoteButton = document.getElementById("nextQuote");
const saveQuoteButton = document.getElementById("selectQuote");

let currentQuoteText ="";
let isQuoteSaved = false;

function showLoadingSpinner(){
    loadingSpinner.style.display ="block";
    quoteDisplayArea.style.display ="none";
}

function hideLoadingSpinner(){
    loadingSpinner.style.display="none";
    quoteDisplayArea.style.display="block";
}


async function fetchKoreaQuostes() {
    showLoadingSpinner();
    const apiUrl ="https://korean-advice-open-api.vercel.app/api/advice";
    try{
        //명언을 가져옵니다.
        const response = await fetch(apiUrl);
        const data = await response.json();
        currentQuoteText = data.message;

        //명언을 화면에 표시
        currentQuote.innerText = currentQuoteText;
        localStorage.setItem("currentQuote",currentQuoteText);
        isQuoteSaved = false;
        //isQuoteSaved는 아직 true가 되면안됨,
        //api를 통해 데이터를 가져오기만했지 아직 로컬스토리지에 저장한거는 아니다
    }catch(error){
        console.error(`에러발생:${error}`);
        currentQuote.innerText ="명언을 불러올수없습니다."
    }
    hideLoadingSpinner();
}

    function saveFavoriteQuote(){
        const storedQuote = localStorage.getItem("currentQuote");

        if (isQuoteSaved == false && storedQuote !== null && !isQuoteAlreadyInList(storedQuote)) {
            const listItem = document.createElement("li"); 
            listItem.innerText = storedQuote; 
            favoriteQuoteList.appendChild(listItem); 
            isQuoteSaved = true;
        }else if(isQuoteSaved == true){
            alert("이 명언은 이미 저장되었습니다.");
        }else{
            alert("이 명언은 이미 즐겨찾기에 추가되었습니다.")
        }
    }

    function isQuoteAlreadyInList(quote){
        const listItems = favoriteQuoteList.getElementsByTagName("li");
        for(item of listItems){
            if(item.innerText === quote){
                return true;
            }
        }
        return false;
    }
    //다음 버튼 클릭 시 새로운 명언 생성
    nextQuoteButton.addEventListener("click",fetchKoreaQuostes);
    //선택 버튼 클릭시 명언을 즐겨찾기에 추가
    saveQuoteButton.addEventListener("click",saveFavoriteQuote);

    //페이지 로드시 첫 명언 호출
    fetchKoreaQuostes();

    isQuoteAlreadyInList();
