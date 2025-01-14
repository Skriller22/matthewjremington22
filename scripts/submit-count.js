document.addEventListener('DOMContentLoaded', (event) => {
    let clickCount = 0;
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', (event) => {
        clickCount++;
        alert(`You have submitted ${clickCount} messages.`);
    });
});