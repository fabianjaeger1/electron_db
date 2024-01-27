const { app, BrowserWindow , ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {PythonShell} = require('python-shell');
const { create } = require('domain');

// For popups

let mainWindow;

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
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false,
    }); 
}

// ipcMain.handle('open-popup', () => {
//     const popup = new BrowserWindow({
//         width: 400,
//         height: 200,
//         frame: false,
//         transparent: true,
//         webPreferences: {
//             nodeIntegration: true,
//         },
//     });
  
//     popup.loadFile(path.join(__dirname, 'settings.html'));
// });

// function changePage(url) {
//     mainWindow.loadFile("settings.html");
// }


// ipcMain.on('change-page', (event, url) => {
//     changePage(url);
// });

function showSearchWindow() {
    mainWindow.loadFile("web/frontend/index.html")
        .then(() => { mainWindow.show();})
}

function showSettingsWindow() {
    mainWindow.loadFile("settings.html")
        .then(() => { mainWindow.show(); })
}
// The settings window is the child to main window search
ipcMain.on("openSetttingsWindow", (event, arg) => {
    
});

app.whenReady().then(() => {
    mainWindow = createWindow();
    mainWindow.loadURL('http://localhost:8000/frontend/index.html');
    mainWindow.show(true)
    // createWindow();

    // showSettingsWindow();
    // showSearchWindow();
    // PythonShell.run('./backend/main.py', null).then(messages=>{
    //     console.log("Test");
    // });

    // let options = {
    //     mode: 'text',
    //     args: [input.value]
    // }; 

    // PythonShell.run("/Users/fabianjaeger/Developer/electron_app/backend/main.py", null, function (err, results) {
    //     if (err) console.log(err);
    //     console.log('finished');
    //     console.log(results);
    // });

    // PythonShell.run('./backend/main.py')


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    
    // ipcMain.on('load-second-page', () => {
    //     console.log("loading second page")
    //     // Load the second internal page
    //     mainWindow.loadFile(path.join(__dirname, 'settings.html'));
    //     });
    });
});

app.on('window-all-closed', () => {
    if (process.platform == 'darwin') {
        // console.log("closing")
        // fetch(`http://127.0.0.1:49002/shutdown`).then((data)=>{      
        //     return data.text();
        // }).then((text)=>{
        //   console.log("data: ", text);
        // }).catch(e=>{
        //   console.log(e);
        // })
        app.quit();
    }
});