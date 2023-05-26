'use strict';

// // event handler (SPA)

// progress bar initialization
// // 1. create function to display results for a sdg

const progressCtx = document.querySelector('#progress-bar');
let progressBar = null;

function drawProgress(ctx, config) {
    if (progressBar == null) {
        progressBar = new Chart(ctx, config);
    }
    else {
        let newDatasArray = progress_data.progress;
        progressData = newDatasArray;
        progressBar.update();
    }
};

let progressData = {
    labels: [''],
    datasets: [
        {
            label: 'progress',
            data: [0],
        }
    ],
};

const progressConfig = {
    type: 'bar',
    data: progressData,
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
};


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
                title: responseJson.title,
                description: responseJson.description,
                progress: responseJson.progress,
                years_from_start: responseJson.ytd,
                // indicator: responseJson.indicator
            };
            
            drawProgress(progressCtx, progressConfig);

            
            // let progressBar = new Chart(progressCtx, progressConfig);
            
            // function drawProgress2(ctx, config) {

            //     console.log(progressBar);

            //     let newDatasArray = progress_data.progress;
            //     progressData = newDatasArray;

            //     progressBar.update();
            // };

            // drawProgress2(progressCtx, progressConfig);

            // drawProgress2(progressCtx, progressConfig);


            // new Chart(document.querySelectorAll('.progress-bar'), {
            //     type: 'bar',
            //     data: {
            //         labels: [''],
            //         datasets: [
            //             {
            //                 label: 'progress',
            //                 data: [progress_data.progress],
            //             },
            //         ],
            //     },
            //     options: {
            //         indexAxis: 'y',
            //         scales: {
            //             x: {
            //                 max: 100,
            //                 ticks: {
            //                     // display: false,
            //                     callback: value => `${value}%`
            //                 }
            //             },
            //             y: {
            //                 beginAtZero: true,
            //                 grid: {
            //                     display: false,
            //                     drawBorder: false
            //                 },
            //                 ticks: {
            //                     display: false
            //                 }
            //             },
            //         },
            //         plugins: {
            //             legend: {
            //                 display: false
            //             },
            //             tooltip: {
            //                 enabled: false
            //             }
            //         }
            //     }
            // });

            // Pie chart using years elapsed/remaining

            const pieTimeData = {
                labels: ['years from start', 'years remaining'],
                datasets: [
                    {
                        data: [
                            progress_data.years_from_start, 
                            15 - progress_data.years_from_start
                        ],
                    },
               ],
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
            }

            const pieTimeConfig = {
                type: 'pie',
                data: pieTimeData,
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
            };

            const pieCtx = document.querySelector('#spa-time-pie');
            // new Chart(ctxPie, pie_time_config)

            
            function drawPie(ctx, config) {
                let pieTimeChart = null;
                if (pieTimeChart != null) {
                    pieTimeChart.destroy();
                }

                pieTimeChart = new Chart(ctx, config);
            };

            drawPie(pieCtx, pieTimeConfig);
            
            // new Chart(document.querySelector('#spa-time-pie'), {
            //     type: 'pie',
            //     data: {
            //         labels: ['years from start', 'years remaining'],
            //         datasets: [
            //             {
            //                 data: [progress_data.years_from_start, 15 - progress_data.years_from_start],
            //             },
            //         ],
            //     },
            //     options: {
            //         plugins: {
            //             legend: {
            //                 display: false
            //             },
            //             tooltip: {
            //                 enabled: false
            //             }
            //         }
            //     },
            // });

            // Burndown chart of both data points (progress and years)

            const burnCtx = document.querySelector('#spa-burndown');

            // data
            const burnProgress = progress_data.progress;
            const burnYears = progress_data.years_from_start;

            // to build the dotted segment of the actual line (expected up to 2023)
            const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
            
            const burnData = {
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
                        {x: 15 + burnYears, y: burnProgress},
                    ],
                }, {
                    label: 'most recent data',
                    data: [
                        {x: 15 + burnYears, y: 0},
                        {x: 15 + burnYears, y: NaN},
                        {x: 15 + burnYears, y: 100}
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
            const burnConfig = {
                type: 'scatter',
                data: burnData,
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

            function drawBurn(ctx, config) {
                let burnChart = null;
                if (burnChart != null) {
                    burnChart.destroy();
                }

                burnChart = new Chart(ctx, config);
            };

            drawBurn(burnCtx, burnConfig)
            // const burn_chart = new Chart(test_burn, burn_config);
        });
    });
};