'use strict';

// create event listeners for all goal buttons

// const inputTests = document.querySelectorAll('button.test-in');
// const outputTest = document.querySelector('.test-out');

// for (const inputTest of inputTests) {
//     inputTest.addEventListener('click', () => {
//         outputTest.innerHTML = 'this works three';
//     }); 
// }


// // event handler (SPA)

// // 1. create function to display results for a sdg

function displayDash(results) {
    const goalProgress = results.progress;
    const goalYtd = results.ytd;

    const goalProgressEle = document.querySelector('#dashboard-progress');
    const goalYtdEle = document.querySelector('#dashboard-ytd');

    goalProgressEle.innerHTML = null;
    goalYtdEle.innerHTML = null;

    goalProgressEle.innerText = goalProgress;
    goalYtdEle.innerText = goalYtd;
}

// // 2. create event handler for each goal's button
const inputGoals = document.querySelectorAll('#spa-goal-code');

for (const inputGoal of inputGoals) {

    // console.log(inputGoal.innerText);

    inputGoal.addEventListener('click', (evt) => {
        evt.preventDefault();

        const inputGoalEle = inputGoal.querySelector('.spa-test-in');
        console.log(inputGoalEle);
        const goalcode = Number(inputGoalEle.innerText);
        
        fetch(`/progress_data.json/${goalcode}`)
        .then(response => response.json())
        .then(responseJson => {
            displayDash(responseJson);
        });
    });
}
