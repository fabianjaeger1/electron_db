const { app, BrowserWindow , ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {PythonShell} = require('python-shell');
const { create } = require('domain');

let mainWindow;

function deleteText() {
    var textField = document.getElementById('searchInput');

    // Check if the current value is not the placeholder
    if (textField.value !== textField.placeholder) {
      textField.value = ''; // Clear the text field
    }
}    
// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 1200,
//         height: 800,
//         // resizable: false,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js'),
//             nodeIntegration: true
//         }
//     });

//     mainWindow.loadFile('index.html');
// }
function createWindow() {
    return new BrowserWindow({
        width: 1200,
        height: 800,
        // resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    }); 
}


function showSearchWindow() {
    mainWindow.loadFile("index.html")
        .then(() => { mainWindow.show();})
}

function showSettingsWindow() {
    mainWindow.loadFile("settings.html")
        .then(() => { mainWindow.show(); })
}

// ipcMain.on('change-view', ()=>{
//     BrowserWindow.getAllWindows()[0].loadURL(url.format({
//         pathname : path.join(__dirname,'settings.html'),
//         protocol:'file',
//         slashes:true
//     }));
// });

app.whenReady().then(() => {
    mainWindow = createWindow();
    // createWindow();
    // showSettingsWindow();
    showSearchWindow();
    // PythonShell.run('./backend/main.py', null).then(messages=>{
    //     console.log("Test");
    // });

    let options = {
        mode: 'text',
        args: [input.value]
    }; 

    PythonShell.runString('./backend/main.py', options, function (err, results) {
        console.log('finished');
        console.log(results);
      });

    PythonShell.run('./backend/main.py')


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    
    ipcMain.on('load-second-page', () => {
        console.log("loading second page")
        // Load the second internal page
        mainWindow.loadFile(path.join(__dirname, 'settings.html'));
        });
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});