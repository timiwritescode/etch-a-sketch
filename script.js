
let sketchArea = document.querySelector('.sketch-area')

mouseDown = false;
sketchArea.addEventListener('mousedown', () => {
    mouseDown = true;
    console.log(mouseDown);
})

sketchArea.addEventListener('mouseup', () => {
    mouseDown = false;
    console.log(mouseDown);
})



// utility functions
function createGrid () {
    let newPoints = document.createElement('div');
    newPoints.className = 'points';
    for (let i =0; i < 64 * 64; ++i) {
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

window.addEventListener('load', createGrid)