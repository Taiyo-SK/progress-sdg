'use strict';

// test

const inputTests = document.querySelectorAll('.test-in');
const outputTests = document.querySelectorAll('.test-out');

console.log(inputTests);
console.log(outputTests);

for (const inputTest of inputTests) {
    inputTest.addEventListener('click', (evt) => {
        for (const outputTest of outputTests) {
            // let testButton = evt.target;
            outputTest.insertAdjacentHTML('beforeend', 'help me');
        }
    }); 
}


// // event handler (SPA)

// // 1. create function to display results for a sdg

// function displayDash(results) {
//     const goalProgress = results.progress;
//     const goalYtd = results.ytd;

//     const goalProgressEle = document.querySelector('#dashboard-progress');
//     const goalYtdEle = document.querySelector('#dashboard-ytd');

//     goalProgressEle.innerHTML = null;
//     goalYtdEle.innerHTML = null;

//     goalProgressEle.innerText = goalProgress;
//     goalYtdEle.innerText = goalYtd;
// }

// // 2. create event handler for each goal's button
// const inputGoals = document.querySelectorAll('.btn-goal');
// // console.log(inputGoals);

// for (const inputGoal of inputGoals) {

//     inputGoal.addEventListener('click', (evt) => {
//         evt.preventDefault();
        
//         const goalcode = Number(inputGoal);
        
//         fetch(`/progress_data.json/${goalcode}`)
//         .then(response => response.json())
//         .then(responseJson => {
//             displayDash(responseJson);
//         });
//         console.log(responseJson);
//     });
// }
