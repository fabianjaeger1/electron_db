// const { remote, ipcRenderer } = require('electron');
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    console.log("inside select path")
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})

// const mainProcess = remote.require('./main.js');

// function showPathSelector() {
//     ipcRenderer.invoke('show-path-selector');
// }

// openFileButton.addEventListener('click', () => { 
//     mainProcess.getFileFromUser(); 
// });

// ipcRenderer.on('file-opened', (event, file, content) => { 
//     console.log("opened")

// });