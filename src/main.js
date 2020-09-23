const { ipcRenderer } = require('electron');

const output = document.getElementById('output'); // output video element

const select = document.getElementById('select'); // select cam
navigator.mediaDevices.enumerateDevices().then((list) => {
    list.map((i) => {
        if (i.kind === 'videoinput') {
            let temp = document.createElement('option');
            temp.innerHTML = i.label;
            temp.value = i.deviceId;
            select.appendChild(temp)
        }
    });
})

select.onchange = () => {
    if(select.value === 'select') return;
    var constraints = {
        audio: false, video: { width: 1280, height: 720 }, deviceId: {
            exact: select.value
        }
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            output.srcObject = mediaStream;
            output.onloadedmetadata = function (e) {
                output.play();
            };
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });
    output.style.display = 'block';
    select.style.display = 'none';
}


document.body.onkeydown = (e) => {
    switch (e.keyCode) {
        case 83: //s
            output.style.display = 'none';
            select.style.display = 'block';
            select.selectedIndex = 0;
            break;
        case 77: //m
            ipcRenderer.send('window_change', 'm');
            break;
        case 84: //t
            ipcRenderer.send('window_change', 't');
            break;
        case 67: //c
            ipcRenderer.send('window_change', 'c');
            break;
    }
    console.log(e.keyCode);
};
