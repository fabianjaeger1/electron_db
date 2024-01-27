const { ipcRenderer } = require('electron');

console.log("Renderer process loaded.")

// function changePage() {
//   const newUrl = 'https://example.com'; // Replace with the desired URL
//   ipcRenderer.send('change-page', newUrl);
// }

// function openPopup() {
//   ipcRenderer.invoke('open-popup');

// }

// function togglePopup() {
//   var popup = document.getElementById('popup');
//   popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
// }

document.getElementById('overlay').addEventListener('click', function() {
  console.log("overlay pressed")
  window.location.hash = ''; // Remove the fragment identifier to dismiss the popup
});

document.addEventListener('DOMContentLoaded', function() {
    var textField = document.getElementById('searchfield'); 
    var sendbutton = document.getElementById('sendbutton');
    var buttonImage = sendbutton.querySelector('img');
    var showSettings = document.getElementById('showSettings')
    var showSearch = document.getElementById('showSearch')
    const settingsPopup = document.getElementById('myPopup');
    const closeSettings = document.getElementById('closePopup');

  //   // var popup = document.getElementById('popup');
  // if (!settingsPopup.contains(event.target)) {
  //     // Clicked outside the popup, close it
  //     settingsPopup.style.display = 'none';
  // }

    var clickableDivs = document.querySelectorAll('.settings-tab-header-item');

    clickableDivs.forEach(function (div) {
      div.addEventListener('click', function() {
        // Remove 'selected' class from all elements
        clickableDivs.forEach(function (otherDiv) {
            otherDiv.classList.remove('selected');
        });

        // Add 'selected' class to the clicked element
        this.classList.add('selected');
        });
    });

    closeSettings.addEventListener('click', function () {
      settingsPopup.classList.remove('show');
    });

    showSettings.addEventListener('click', () => {
      console.log("showSearch button pressed")
      myPopup.classList.add('show');
    })

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
