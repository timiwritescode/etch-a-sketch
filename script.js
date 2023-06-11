let sketchArea = document.querySelector('.sketch-area')
let panelDefault = document.querySelector('.default');
let panelActive = document.querySelector('.p');

mouseDown = false;
sketchArea.addEventListener('mousedown', () => {
    mouseDown = true;
    console.log(mouseDown);
});

sketchArea.addEventListener('mouseup', () => {
    mouseDown = false;
    console.log(mouseDown);
});




// utility functions
function createGrid () {
    let newPoints = document.createElement('div');
    newPoints.className = 'points';
    for (let i =0; i < 17 * 17; ++i) {
        sketchArea.appendChild(newPoints.cloneNode(true))
    };

    let points = document.querySelectorAll('.points');
    points.forEach((point) => {
        point.addEventListener('mousedown', changeColor);
        point.addEventListener('mouseover',changeColor);  
    });
    
};


function changeColor (e) {
    if ((mouseDown && e.type === 'mouseover') || e.type == 'mousedown'){
        e.target.style.backgroundColor = 'green';
        console.log(e.type);
} else {
    return;
};
    
};


//function to add elements based on screen size
function addElementsBasedOnScreenSize () {
    if (window.innerWidth < 700) {
        let mainElement = document.querySelector('.mobile-panel');
        mainElement.style.display = 'inherit';
        };
}

// function to remove elements based on the screen size
function removeElementsBasedOnScreenSize () {
    if (window.innerWidth >= 700) {
    let mainElement = document.querySelector('.mobile-panel');
    mainElement.style.display = 'none';
    };
}


// function to toggle the panel on on mobile devices
function togglePanelOn () {
    let panelDefault = document.querySelector('.default');
    let panelActive = document.querySelector('.active')
    let panelElements = document.querySelector('.panel-elements');
    panelDefault.style.display = 'none';
    panelElements.style.display = 'inherit';
    panelActive.classList.add('active-transition');
    panelActive.style.width = '50%';
};


// function to toggle the panel off on mobile devices
function togglePanelOff () {
    let panelDefault = document.querySelector('.default');
    let panelActive = document.querySelector('.active');
    
    panelDefault.style.display = 'inherit';
    panelActive.classList.add('active-transition');
    panelActive.style.width = '0%';
    panelActive.style.display = 'none'
};

window.addEventListener('resize', () => {
    if (window.innerWidth < 700) {
        addElementsBasedOnScreenSize()      
    } else {
        
        removeElementsBasedOnScreenSize()
        
    }
    
});

window.addEventListener('load', () => {
    panelDefault.addEventListener('click', togglePanelOn);
    panelActive.addEventListener('click', togglePanelOff);
    removeElementsBasedOnScreenSize()
    createGrid();
    
})