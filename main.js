// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
const likeGlyphs = document.querySelectorAll('.like-glyph'); // Select all like glyphs

likeGlyphs.forEach((glyph) => {
  glyph.addEventListener('click', () => {
    const heart = glyph;
    const isHeartFull = heart.textContent === FULL_HEART; // Check if the heart is full

    if (!isHeartFull) {
      // If the heart is empty, send a like request
      mimicServerCall()
        .then(() => {
          heart.textContent = FULL_HEART; // Change to full heart
          heart.classList.add('activated-heart'); // Add activated-heart class
        })
        .catch((error) => {
          const errorModal = document.getElementById('error-modal');
          const errorMessage = document.getElementById('error-message');

          // Display the error message
          errorMessage.textContent = error; // Set the error message
          errorModal.classList.remove('hidden'); // Show the modal

          // Hide the modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    } else {
      // If the heart is full, change it back to empty
      heart.textContent = EMPTY_HEART; // Change to empty heart
      heart.classList.remove('activated-heart'); // Remove activated-heart class
    }
  });
});

// Mock server call function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2; // 20% chance of failure
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
