const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide the install prompt button
  butInstall.style.display = 'none';
  // Show the prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    // Clean up deferredPrompt variable
    deferredPrompt = null;
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully.');
});
