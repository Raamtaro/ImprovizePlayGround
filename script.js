const form = document.getElementById("chat-form");

function setCookie(cookieName, cookieValue, expirationDays) {
  const d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000)); // Expiration time in milliseconds
  const expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}

const sessionId = Math.random().toString(36).substring(2,9);

setCookie('sessionId', sessionId, 7);

form.addEventListener("submit", function(event){
    //prevents the page from being loaded upon form submit
    event.preventDefault();

    //establish node for chatLog
    let chatLog = document.querySelector(".chatLog");

    //add user inquiry to the chat history
    let userInput = document.getElementById("user-input");
    let userBubble = document.createElement("div")

    //adding a class for styling purposes
    userBubble.classList.add("history"); 
    userBubble.classList.add("user");

    //Set the userBubble textContent, and then append to the chatLog
    userBubble.textContent=userInput.value;
    chatLog.appendChild(userBubble);

    chatLog.scrollTop = chatLog.scrollHeight;

    //Same process for the gptResponse
    let gptResponse = document.createElement("div")
    
    //add class for styling
    gptResponse.classList.add("history");
    gptResponse.classList.add("gpt"); 

    //Set the textContent, and then add to the chatlog
    let userMsg = userInput.value;
    const postData = {pin: '1945', user: getCookie('sessionId'), query: userMsg, page: null};
    console.log(postData.user);
    //Utilize the fetch API to send our userMsg
    async function postJSON(data) {
        try {
            //Set up the body of the request using fetch(URL)
          const response = await fetch("https://app.improvize.com/botv2", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": "andy-WGVoMGfN"
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json(); //Waits for a response from the server until executing the next line of code
          console.log("Success:", result);

          gptResponse.textContent = result.answer;
          chatLog.appendChild(gptResponse);

          chatLog.scrollTop = chatLog.scrollHeight;
          
        } catch (error) { //Error handling if the request doesn't go through
          console.error("Error:", error);
        }
      };

    postJSON(postData);
    
    //Clear the input field to make room for the user's next inquiry
    userInput.value="";
})