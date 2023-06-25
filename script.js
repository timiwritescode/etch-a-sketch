let sketchArea = document.querySelector('.sketch-area')
let panelToggleOn = document.querySelector('.panel-toggle-on');
let panelToggleOff = document.querySelector('.panel-toggle-off')

mouseDown = false;

sketchArea.addEventListener('mouseup', () => {
    mouseDown = false;

});

sketchArea.addEventListener('mousedown', () => {
    mouseDown = true;
})

sketchArea.addEventListener('touchstart', e => {
    if (window.getComputedStyle(e.target).backgroundColor === 'rgba(0, 0, 0, 0)' ||
    x === 1)
        e.target.style.backgroundColor = getPaintColor();   
    }
, {passive: false})

sketchArea.addEventListener('touchmove', (e)=> {
  e.preventDefault();
  let touch = e.touches[0];
  let element = document.elementFromPoint(touch.clientX, touch.clientY);
  
  if (element.classList.contains('points')) {
    if (window.getComputedStyle(element).backgroundColor === 'rgba(0, 0, 0, 0)' ||
            x === 1)
                element.style.backgroundColor = getPaintColor();   
            };
}, {passive:false})


// utility functions
function createGrid () {
    let newPoints = document.createElement('div');
    let gridSizeInput = document.getElementById('grid-size-input');
    let gridSize = gridSizeInput.value;
    newPoints.className = 'points';
    for (let i =0; i < +gridSize * +gridSize; ++i) {
        sketchArea.appendChild(newPoints.cloneNode(true))
    };
    
    let points = document.querySelectorAll('.points');
    points.forEach((point) => {
        point.addEventListener('mousedown', changeColor);
        point.addEventListener('mouseover',changeColor); 
        point.style.width = `calc(100% / ${gridSize})`
        
        
    });
      
};



function changeColor (e) {    
    
    if (window.innerWidth > 700) {
        if ((mouseDown && e.type === 'mouseover') || e.type == 'mousedown'){
            if (window.getComputedStyle(e.target).backgroundColor === 'rgba(0, 0, 0, 0)' ||
            x === 1)
                e.target.style.backgroundColor = getPaintColor();   
            } 
            

    } else {
        return;
    }; 
} 
 



//function to add elements based on screen size
function addElementsBasedOnScreenSize () {
    if (window.innerWidth < 700) {
        let mainElement = document.querySelector('.panel-toggle-on');
        let panel = document.querySelector('.panel');
        panel.classList.add('panel-full-height')
        mainElement.style.display = 'inherit';
        };
}

// function to remove elements based on the screen size
function removeElementsBasedOnScreenSize () {
    if (window.innerWidth >= 700) {
    let panelToggleOn = document.querySelector('.panel-toggle-on');
    let panel = document.querySelector('.panel');
    panelToggleOn.style.display = 'none';

    if (panel.classList.contains('panel-full-height')) {
        panel.classList.remove('panel-full-height')
    }
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

// function to change color randomly
function changeColorRandomly () {
    let randomColor = `rgb(${Math.ceil(Math.random() * 255)}, 
                ${Math.ceil(Math.random() * 255)}, 
                ${Math.ceil(Math.random() * 255)})`
    
    return randomColor
};

// function to change color according to color change
let x = 0;

function colorState () {
    let defaultBtn = document.getElementById('default');
    let rainbowBtn = document.getElementById('rainbow');
    let eraserBtn = document.getElementById('eraser');
    let customBtn = document.getElementById('custom');
    
    defaultBtn.addEventListener('click', () => {
        x = 0
        if (eraserBtn.classList.contains('btn-active')){
            eraserBtn.classList.remove('btn-active');
        } else if (rainbowBtn.classList.contains('btn-active')) {
            rainbowBtn.classList.remove('btn-active');
        };

        if (!defaultBtn.classList.contains('btn-active')) {
            defaultBtn.classList.add('btn-active')
        }
        
    });
    
    eraserBtn.addEventListener('click', () => {
        x = 1;
        if (defaultBtn.classList.contains('btn-active')){
            defaultBtn.classList.remove('btn-active');
        } else if (rainbowBtn.classList.contains('btn-active')) {
            rainbowBtn.classList.remove('btn-active');
        };

        eraserBtn.classList.add('btn-active')
        
    });

    rainbowBtn.addEventListener('click', () => {
        x = 2
        if (defaultBtn.classList.contains('btn-active')){
            defaultBtn.classList.remove('btn-active');
        } else if (eraserBtn.classList.contains('btn-active')) {
            eraserBtn.classList.remove('btn-active');
        };

        rainbowBtn.classList.add('btn-active')
    });

    customBtn.addEventListener('click', () => {
        x = 3
    });
    
};

colorState()

function getPaintColor () {
    switch (x) {
        // default btn pressed
        case 0:
            return 'black'

        // eraser button pressed
        case 1:
            return 'transparent'
           
        // rainbow button pressed    
        case 2:
            return changeColorRandomly()
    }
    let colorWheel = document.getElementById('color-wheel');
    return colorWheel.value;
  }

  // function to size grid according to input
  function changeGridSize () {
    let gridSizeValuePara = document.getElementById('grid-size-value');
    let gridSizeInput = document.getElementById('grid-size-input');
    
    
    gridSizeInput.addEventListener('change', () => {
        let points = document.querySelectorAll('.points');
        [...points].forEach(point => {
            sketchArea.removeChild(point);
            
        });
        
        createGrid()

        // add grid lines for a short time
        let newPoints = document.querySelectorAll('.points');
        newPoints.forEach(point => {
            point.classList.add('grid-lines')
        });

        // state manager for when to remove gridlines 
        let y = 0;
        let intervalId = setInterval(() => {
            y++;
            if (y == 1) {
                newPoints.forEach(point => {
                    point.classList.remove('grid-lines');
                    
                });
            };
        }, 1000)
        if (y == 1) {
            clearInterval(intervalId);
            y = 0;
        };
        
    });
    
  }

  
changeGridSize()

let gridButton = document.getElementById('grid-button');
let newGridButton = gridButton.cloneNode(true);
newGridButton.textContent = 'Remove grid lines';

gridButton.addEventListener('click', () => {
    let points = document.querySelectorAll('.points');
    points.forEach(point => {
        point.classList.add('grid-lines');
    });
    gridButton.parentNode.replaceChild(newGridButton, gridButton);
  });

newGridButton.addEventListener('click', () => {
    let points = document.querySelectorAll('.points');
    points.forEach(point => {
        point.classList.remove('grid-lines');
    });

    newGridButton.parentNode.replaceChild(gridButton, newGridButton);
});

let backgroundButton = document.getElementById('background-button');
backgroundButton.addEventListener('click', () => {
    let sketchArea = document.querySelector('.sketch-area');
    let backgroundColorSelector = document.getElementById('background-color-selector');
    sketchArea.style.backgroundColor = backgroundColorSelector.value
})

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
    addElementsBasedOnScreenSize()
    createGrid();

    if (window.innerWidth < 700) {
        alert('Click the button at the top right corner for the toolbox')
    }
    
})

