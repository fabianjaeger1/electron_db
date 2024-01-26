// const { ipcRenderer } = require('electron');
// const { ipcRenderer } = window.require('electron');
// const searchInput = document.getElementById('searchInput');
// const searchResults = document.getElementById('searchResults');
// const { ipcRenderer } = require('electron');

// const ipcRenderer = require('electron').ipcRenderer;


console.log("Renderer process loaded.")

// console.log(window.myAPI)
// => { desktop: true }

// searchInput.addEventListener('input', () => {
//     const searchTerm = searchInput.value.toLowerCase();
//     // You can implement your search logic here

//     // For demonstration purposes, let's populate some dummy results
//     const results = ['Result 1', 'Result 2', 'Result 3'];

//     // Clear previous results
//     searchResults.innerHTML = '';

//     // Display new results
//     results.forEach(result => {
//         const li = document.createElement('li');
//         li.textContent = result;
//         searchResults.appendChild(li);
//     });
// });



// document.addEventListener('DOMContentLoaded', () => {
//     // const changeButton = document.getElementById('loadSettings');

//     // changeButton.addEventListener('click', () => {
//     //     ipcRenderer.send('load-second-page');
//     // });

//     // // Get reference to the button by its ID
//     // var myButton = document.getElementById('sendbutton');

//     // // Add a click event listener to the button
//     // myButton.addEventListener('click', () => {
//     //     // Perform your action here
//     //     alert('Button clicked!');
//     // });

//     var textField = document.getElementById('searchfield');
//     var button = document.getElementById('sendbutton');
//     var buttonImage = button.querySelector('img');

//     textField.addEventListener('input', () => {
//         if (textField.value !== '' && textField.value !== textField.placeholder) {
//             buttonImage.style.display = 'inline';
//             buttonImage.removeAttribute('disabled');
//             console.log('Event listener activated: Text field is not empty');
//         } else {
//             buttonImage.style.display = 'none';
//             button.setAttribute('disabled', 'disabled');
//             console.log('Event listener activated: Text field is empty');
//         }
//     });
// });






// document.addEventListener('DOMContentLoaded', () => {

//     const changeButton = document.getElementById('loadSettings');

//     changeButton.addEventListener('click',()=>{
//         ipcRenderer.send('load-second-page');
//     });
    
//     // const loadPage1Btn = document.getElementById('loadSearch');
//     // const loadPage2Btn = document.getElementById('loadSettings');
//     // const contentContainer = document.getElementById('contentContainer');
  
//     // load.addEventListener('click', () => {
//     //   // Send a message to the main process to load page1.html
//     //   ipcRenderer.send('change-view', 'index.html');
//     // });
  
//     // loadPage2Btn.addEventListener('click', () => {
//     //   // Send a message to the main process to load page2.html
//     //   ipcRenderer.send('change-view', 'settings.html');
//     // });
  
//     // // Listen for the 'change-content' event from the main process
//     // ipcRenderer.on('change-content', (event, newContent) => {
//     //   contentContainer.innerHTML = newContent;
//     // });
// });


// document.addEventListener('DOMContentLoaded', function () {
//     // Get reference to the button by its ID
//     var myButton = document.getElementById('sendbutton');

//     // Add a click event listener to the button
//     myButton.addEventListener('click', function () {
//         // Perform your action here
//         alert('Button clicked!');
//     });
// });



document.addEventListener('DOMContentLoaded', function() {
    var textField = document.getElementById('searchfield'); 
    var sendbutton = document.getElementById('sendbutton');
    var buttonImage = sendbutton.querySelector('img');
    var showSettings = document.getElementById('showSettings')
    var searchSettings = document.getElementById('showSearch')

    sendbutton.addEventListener('click', () => {
        
        // mainWindow.ipcRender.send('message:showSettings');
        console.log("entered listener")
        fetch(`http://127.0.0.1:49002/search/${textField.value}`).then((data)=>{      
            return data.text();
        }).then((text)=>{
          console.log("data: ", text);
        }).catch(e=>{
          console.log(e);
        })
        console.log('clicked searchSettings');
    });

    textField.addEventListener('input', function() {
        if (textField.value !== '' && textField.value !== textField.placeholder) {
            buttonImage.style.display = 'inline'
            sendbutton.removeAttribute('disabled')
            // sendbutton.style.visibility = 'visible'
            console.log('Event listener activated: Text field is not empty');
        } else {
            buttonImage.style.display = 'none'
            sendbutton.disabled = true;

            // sendbutton.style.visibility = 'hidden'
            // button.setAttribute('disabled', 'disabled');
            console.log('Event listener activated: Text field is empty');
            }
        });
});
