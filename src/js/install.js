const butInstall = document.getElementById('buttonInstall');

// Add event listener for beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event triggered');
    // Prevent the default behavior of the event
    event.preventDefault();
    // Store the event for later use
    window.deferredPrompt = event;
    // Show the install button
    installButton.classList.toggle('hidden', false);
});

// Add click event listener for install button
installButton.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    // If there is no prompt event, exit the function
    if (!promptEvent) {
        return;
    }
    try {
        // Show the install prompt
        promptEvent.prompt();
        // Wait for user response
        const choiceResult = await promptEvent.userChoice;
        console.log('User choice:', choiceResult.outcome);
        // Reset the deferred prompt variable
        window.deferredPrompt = null;
        // Hide the install button
        installButton.classList.toggle('hidden', true);
    } catch (error) {
        console.error('Error showing install prompt:', error);
    }
});

// Add event listener for appinstalled
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled event triggered');
    // Reset the deferred prompt variable
    window.deferredPrompt = null;
});
