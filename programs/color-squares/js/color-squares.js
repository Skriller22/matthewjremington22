document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell-size'));
    const gridWidth = Math.floor(window.innerWidth / cellSize);
    const gridHeight = Math.floor(window.innerHeight / cellSize) - 2; // Adjust for color bar height
    const totalItems = gridWidth * gridHeight;
    let selectedColor = 'lightgray';
    let isMouseDown = false;
    let raveInterval;

    document.documentElement.style.setProperty('--grid-width', gridWidth);

    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            selectedColor = option.style.backgroundColor;
        });
    });

    gridContainer.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    gridContainer.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    for (let i = 0; i < totalItems; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);
        
        gridItem.addEventListener('click', () => {
            gridItem.style.backgroundColor = selectedColor;
            saveGridState();
        });

        gridItem.addEventListener('mouseover', () => {
            if (isMouseDown) {
                gridItem.style.backgroundColor = selectedColor;
                saveGridState();
            }
        });
    }

    document.querySelector('.clear-button').addEventListener('click', () => {
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.backgroundColor = 'lightgray';
        });
        saveGridState();
        if (raveInterval) {
            clearInterval(raveInterval);
            raveInterval = null;
        }
    });

    document.querySelector('.randomize-button').addEventListener('click', () => {
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.backgroundColor = getRandomColor();
        });
        saveGridState();
    });

    document.querySelector('.rave-button').addEventListener('click', () => {
        if (raveInterval) {
            clearInterval(raveInterval);
            raveInterval = null;
        } else {
            raveInterval = setInterval(() => {
                document.querySelectorAll('.grid-item').forEach(item => {
                    item.style.backgroundColor = getRandomColor();
                });
                saveGridState();
            }, 200);
        }
    });

    loadGridState();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function saveGridState() {
    const gridItems = document.querySelectorAll('.grid-item');
    const gridState = Array.from(gridItems).map(item => item.style.backgroundColor);
    localStorage.setItem('gridState', JSON.stringify(gridState));
}

function loadGridState() {
    const gridState = JSON.parse(localStorage.getItem('gridState'));
    if (gridState) {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            item.style.backgroundColor = gridState[index];
        });
    }
}
