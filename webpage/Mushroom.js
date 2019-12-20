import createOffense from './Model.js'

function init(){
    addEventListeners(); 
}

function addEventListeners(){
    var low = document.getElementById('low'),
        middle = document.getElementById('middle'),
        hard = document.getElementById('hard');

    low.addEventListener('click', function(){
        offend("low")
    });
    middle.addEventListener('click', function(){
        offend("middle")
    });
    hard.addEventListener('click', function(){
        offend("hard")
    });
}

function offend(intensity){    
    document.getElementById('output').innerHTML = createOffense(intensity)
}

init();