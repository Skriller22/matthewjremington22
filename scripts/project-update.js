document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const highlightSection = doc.querySelector('.highlight');
            if (highlightSection) {
                document.querySelector('main').appendChild(highlightSection);
            }
        })
        .catch(error => console.error('Error fetching the projects page:', error));
});
