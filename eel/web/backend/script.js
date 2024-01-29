// EEL javascript functions
// const { ipcRenderer } = require('electron');


function hideElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
}};

function buttonClicked() {
    console.log("button clicked js")
    eel.button_click();
}
 
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

    // var selectpath = document.getElementById("selectpath")




//   // var popup = document.getElementById('popup');
// if (!settingsPopup.contains(event.target)) {
//     // Clicked outside the popup, close it
//     settingsPopup.style.display = 'none';



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

    // selectpath.addEventListener('click', () => {
    //     getFileFromUser()
    // })

    showSettings.addEventListener('click', () => {
        console.log("showSearch button pressed")
        myPopup.classList.add('show');

        var generalsettings = document.getElementById('General')
        var datasettings = document.getElementById('Data')

        // allElements = document.getElementsByClassName('settings-tab-content-container-item')
        // console.log(allElements)

        // Check if the elements exist before attaching event listeners
        if (generalsettings && datasettings) {
            // Settings

            generalsettings.addEventListener('click', function() {
                const targetDiv = document.getElementById('tab1');
                console.log("generalsettings button pressed");
                hideElementsByClass('settings-tab-content-container-item');
                targetDiv.style.display ='block';
            });

            datasettings.addEventListener('click', function() {
                const targetDiv = document.getElementById('tab2');
                console.log("datasettings button pressed");
                hideElementsByClass('settings-tab-content-container-item');
                targetDiv.style.display ='block';
            });
        }

        // Settings

        // generalsettings.addEventListener('click', function() {
        //     const targetDiv = document.getElementById('tab1');
        //     console.log("generalsettings button pressed");
        //     targetDiv.classList.add('show');
        // })

        // datasettings.addEventListener('click', function() {
        //     const targetDiv = document.getElementById('tab2');
        //     console.log("datasettings button pressed");
        //     targetDiv.classList.add('show');
        // })

        // var selectpath = document.getElementById("select_path")
        // selectpath.addEventListener('click', () => {
        //     console.log("select path button pressed");
        //     eel.open_file_dialog()
        // });

    })

    // Send query to eel python backend
    sendbutton.addEventListener('click', () => {
        console.log("clicked send query")
        eel.return_string(textField.value)
    });

    // Hide and unhide send button depending on whether the query field is empty
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