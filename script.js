// window.onload = function () {
//     document
//       .getElementById("chat-form")
//       .addEventListener("submit", function (event) {
//         // Prevent the form from submitting and refreshing the page
//         event.preventDefault();
//         let userInput = document.querySelector(".userMessage");
//         console.log(userInput.textContent)

//         // let userInput = document.getElementById("user-input").value;
//         // let url = `/gpt4?user_input=${encodeURIComponent(userInput)}`;

//         // fetch(url)
//         //   .then((response) => response.json())
//         //   .then((data) => {
//         //     let content = data.content;
//         //     let resultDiv = document.getElementById("result");
//         //     resultDiv.innerHTML = content;
//         //   })
//         //   .catch((error) => {
//         //     console.error("Error fetching GPT-4 response:", error);
//           });
//   };
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
    gptResponse.textContent = userInput.value + " - this is a very intelligently worded question! Bravo! But I don't have an answer." //THIS IS THE SPOT WHERE WE'LL HAVE TO ADJUST THE GPT LOGIC
    chatLog.appendChild(gptResponse);

    userInput.value="";

    // console.log(userInput.value, typeof userInput.value); //test

    // let priorMessage = ""; //variable to store the user's most recent message
    // let priorResponse = ""; //variable to store GPT's most recent response





    




})