const form = document.getElementById("chat-form");

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

    //Same process for the gptResponse
    let gptResponse = document.createElement("div")
    
    //add class for styling
    gptResponse.classList.add("history");
    gptResponse.classList.add("gpt"); 

    //Set the textContent, and then add to the chatlog
    let userMsg = userInput.value;
    const postData = {pin: '1945', user: '', query: userMsg, page: null};

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
        } catch (error) { //Error handling if the request doesn't go through
          console.error("Error:", error);
        }
      };

    postJSON(postData);
    
    //Clear the input field to make room for the user's next inquiry
    userInput.value="";
})