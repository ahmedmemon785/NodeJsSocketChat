const socket = io() 
let name;
let textarea = document.querySelector('#textarea')
let messageArea= document.querySelector('.message__area')
do{
name=prompt('Please Enter your name');
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(msg){
    let msgObj={
        user:name,
        message:msg.trim()
    }

//Append Message
appendMessage(msgObj,'outgoing')
textarea.value='';
scrollToBottom();
textarea.focus();
socket.emit('message',msgObj)
}

function appendMessage(msg,type){
    let mainDiv= document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message');
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv)
}
//Recieve messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();

    console.log(msg)
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}