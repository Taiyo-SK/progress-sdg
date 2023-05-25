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

    console.log(inputGoal.innerText);

    inputGoal.addEventListener('click', (evt) => {
        // evt.preventDefault();

        const inputGoalEle = inputGoal.querySelector('.spa-test-in');
        console.log(inputGoalEle);
        const goalcode = Number(inputGoalEle.innerText);
        
        fetch(`/progress_data.json/${goalcode}`)
        .then(response => response.json())
        .then(responseJson => {
            const progress_data = {
                progress: responseJson.progress,
                years_from_start: responseJson.ytd
            };
            
            // progress bar displaying the progress data

            new Chart(document.querySelectorAll('.progress-bar'), {
                type: 'bar',
                data: {
                    labels: [''],
                    datasets: [
                        {
                            label: 'progress',
                            data: [progress_data.progress],
                        },
                    ],
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            max: 100,
                            ticks: {
                                // display: false,
                                callback: value => `${value}%`
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false
                            }
                        },
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
            });

            // Pie chart using years elapsed/remaining

            new Chart(document.querySelector('#spa-time-pie'), {
                type: 'pie',
                data: {
                    labels: ['years from start', 'years remaining'],
                    datasets: [
                        {
                            data: [progress_data.years_from_start, 15 - progress_data.years_from_start],
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                },
            });

            // Burndown chart of both data points (progress and years)


            const test_burn = document.querySelector('#spa-burndown');

            // data
            const burn_progress = progress_data.progress;
            const burn_years = progress_data.years_from_start;

            // to build the dotted segment of the actual line (expected up to 2023)
            const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
            
            const burn_data = {
                datasets: [{
                    label: 'baseline',
                    data: [
                        {x: 15, y: 0}, 
                        {x: 30, y: 100},
                    ] 
                }, {
                    label: 'actual',
                    data: [
                        {x: 15, y: 0},
                        {x: 15 + burn_years, y: burn_progress},
                    ],
                }, {
                    label: 'most recent data',
                    data: [
                        {x: 15 + burn_years, y: 0},
                        {x: 15 + burn_years, y: NaN},
                        {x: 15 + burn_years, y: 100}
                    ],
                    segment: {
                        borderColor: ctx => skipped(ctx, 'rgb(0,0,0.2)'),
                        borderDash: ctx => skipped(ctx, [6,6])
                    },
                    spanGaps: true
                }, {
                    label: '2023 reference',
                    data: [
                        {x: 23, y: 0},
                        {x:23, y: NaN},
                        {x: 23, y: 100}
                    ],
                    segment: {
                        borderColor: ctx => skipped(ctx, 'rgb(0,0,0.2)'),
                        borderDash: ctx => skipped(ctx, [6,6])
                    },
                    spanGaps: true
                }]
            }

            // config
            const burn_config = {
                type: 'scatter',
                data: burn_data,
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            min: 15,
                            ticks: {
                                callback: value => `20${value}`
                            }
                        },
                        y: {
                            ticks: {
                                callback: value => `${value}%`
                            }
                        }
                    },
                    showLine: true,
                    plugins: {
                        tooltip: {
                            enabled: false,
                        }
                    }
                }
            };

            const burn_chart = new Chart(test_burn, burn_config);
        });
    });
};