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
    if (!e.target.style.backgroundColor && x != 1) {
        e.target.style.backgroundColor = getPaintColor()
    } else {
        e.target.style.backgroundColor = getPaintColor()
    };
    
}, {passive: false})

sketchArea.addEventListener('touchmove', (e)=> {
  e.preventDefault();
  let touch = e.touches[0];
  let element = document.elementFromPoint(touch.clientX, touch.clientY);
  
  if (element.className === 'points') {
    if (!element.style.backgroundColor && x != 1) {
        element.style.backgroundColor = getPaintColor();
    } else {
        element.style.backgroundColor = getPaintColor();
    };
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
            if((!e.target.style.backgroundColor && x != 1) &&
                e.target.style.backgroundColor !== 'transparent' ) {
                e.target.style.backgroundColor = getPaintColor();   
            } 
             
            console.log(e.type);
    } else {
        return;
    }; 
} 
 };



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
        let newPoint = document.createElement('div');
        newPoint.classList.add('points')
        newPoint.style.width = `calc(100% / ${+gridSizeInput.value})`;

        gridSizeValuePara.textContent = gridSizeInput.value + ' x ' + gridSizeInput.value;
        let gridSize = gridSizeInput.value;
        [...points].forEach(point => {
            sketchArea.removeChild(point);
            
        });
        createGrid()    
        
    })
    
  }

  
  changeGridSize()


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
    
})

