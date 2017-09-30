let socket = io.connect('http://192.168.1.71:6677', {
    forceNew: true
});

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map(function (message, index) {
        return (`
        
            <div class="message">
            
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>         
        
        `);
    }).join('');

    let msgs = document.getElementById('messages');
    msgs.innerHTML = html;
    msgs.scrollTop = msgs.scrollHeight;

}

function addMessage(event){

    let message = {
        nickname:document.getElementById('nickname').value,
        text:document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    return socket.emit('add-message', message);

}