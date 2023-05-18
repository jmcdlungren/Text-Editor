const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Adds an event handler to the `beforeinstallprompt` event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt from showing
    event.preventDefault();
    // Store the event for later use
    deferredPrompt = event;
});

// Implements a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Check if the deferredPrompt is available
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        // Reset the deferredPrompt variable
        deferredPrompt = null;
        // Handle the user's choice (e.g., log the result)
        console.log('User choice:', choiceResult.outcome);
    }
});

// Adds an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // The PWA has been successfully installed
    console.log('App installed!');
});
