let sketchArea = document.querySelector('.sketch-area')
let panelToggleOn = document.querySelector('.panel-toggle-on');
let panelToggleOff = document.querySelector('.panel-toggle-off')
sketchArea.addEventListener('mouseup', () => {
    mouseDown = false;

});

sketchArea.addEventListener('touchstart', e => {
  e.target.style.backgroundColor = getPaintColor()
}, {passive: false})

sketchArea.addEventListener('touchmove', (e)=> {
  e.preventDefault();
  let touch = e.touches[0];
  let element = document.elementFromPoint(touch.clientX, touch.clientY);
  
  if (element.className === 'points') {
    element.style.backgroundColor = getPaintColor()
  }
}, {passive:false})


// utility functions
function createGrid () {
    let newPoints = document.createElement('div');
    newPoints.className = 'points';
    for (let i =0; i < 32 * 32; ++i) {
        sketchArea.appendChild(newPoints.cloneNode(true))
    };

    let points = document.querySelectorAll('.points');
    points.forEach((point) => {
        point.addEventListener('mousedown', changeColor);
        point.addEventListener('mouseover',changeColor); 
        
    });
    
};

function getPaintColor () {
  return 'green'
}

function changeColor (e) {
    
    if (window.innerWidth > 700) {
        if ((mouseDown && e.type === 'mouseover') || e.type == 'mousedown'){
            e.target.style.backgroundColor = getPaintColor();
            console.log(e.type);
    } else {
        return;
    }; 
} 
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
    let panel = document.querySelector('.panel');
    panel.classList.add('panel-active')
};


// function to toggle the panel off on mobile devices
function togglePanelOff () {
    let panel = document.querySelector('.panel');
    panel.classList.remove('panel-active')
};



window.addEventListener('resize', () => {
    if (window.innerWidth < 700) {
        addElementsBasedOnScreenSize();
              
    } else {      
        removeElementsBasedOnScreenSize()
        
    }
    
});

window.addEventListener('load', () => {
    panelToggleOn.addEventListener('click', togglePanelOn);
    panelToggleOff.addEventListener('click', togglePanelOff);
    removeElementsBasedOnScreenSize()
    createGrid();
    
})

