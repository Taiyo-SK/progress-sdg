'use strict';


// progress bar

let progressBar = null;

function drawProgress(ajaxProgress) {

    const progressCtx = document.querySelector('#progress-bar');
    
    let progressData = {
        labels: [''],
        datasets: [
            {
                label: 'progress',
                data: [ajaxProgress],
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

    if (progressBar == null) {
        progressBar = new Chart(progressCtx, progressConfig);
    }
    else {
        let newData = ajaxProgress;
        progressBar.config._config.data.datasets[0].data = [newData];
        progressBar.update();
    }
};


// time remaining pie chart
let timePie = null;

function drawPie(ajaxTime) {

    const timePieCtx = document.querySelector('#spa-time-pie');
    
    const timePieData = {
        labels: ['years from start', 'years remaining'],
        datasets: [
            {
                data: [
                    ajaxTime,
                    15 - ajaxTime
                ],
            },
       ]
    }

    const timePieConfig = {
        type: 'pie',
        data: timePieData,
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

    if (timePie == null) {
        timePie = new Chart(timePieCtx, timePieConfig);
    }
    else {
        let newData = [ajaxTime, 15 - ajaxTime];
        timePie.config._config.data.datasets[0].data = newData;
        timePie.update();
    }
};


// burndown chart of progress and time
let burnChart = null;

function drawBurn(ajaxProgress, ajaxTime) {

    const burnCtx = document.querySelector('#spa-burndown');

    // to build the dotted segment of the actual line (expected up to 2023)
    const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
    
    let burnData = {
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
                {x: 15 + ajaxTime, y: ajaxProgress},
            ],
        }, {
            label: 'most recent data',
            data: [
                {x: 15 + ajaxTime, y: 0},
                {x: 15 + ajaxTime, y: NaN},
                {x: 15 + ajaxTime, y: 100}
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

    if (burnChart == null) {
        burnChart = new Chart(burnCtx, burnConfig);
    }
    else {
        let newActual = {x: 15 + ajaxTime, y: ajaxProgress};
        let newMostRecent = [
            {x: 15 + ajaxTime, y: 0},
            {x: 15 + ajaxTime, y: NaN},
            {x: 15 + ajaxTime, y: 100}
        ];
        burnChart.config._config.data.datasets[1].data[1] = newActual;
        burnChart.config._config.data.datasets[2].data = newMostRecent;
        burnChart.update();
    }
};


// text inputs on page (goal title, description)
function updateText(ajaxCode, ajaxTitle, ajaxDescription) {
    let goalCode = document.querySelector('#goal-code');
    let goalTitle = document.querySelector('#goal-title');
    let goalDescr = document.querySelector('#goal-description');

    goalCode.innerText = ajaxCode;
    goalTitle.innerText = ajaxTitle;
    goalDescr.innerText = ajaxDescription;
};


// indicators list
function listIndicators (ajaxIndicators) {

    let tableRef = document.querySelector('#indicators-tb');
    let tableBody = document.querySelector('#indicators-tb-body');

    console.log(ajaxIndicators);
    tableBody = null;

    for (const indicator of ajaxIndicators) {
        let newRow = tableRef.insertRow()
        let indId = newRow.insertCell(0)
        let indDescription = newRow.insertCell(1)
        let indProgress = newRow.insertCell(2)

        indId.innerText = indicator.id,
        indDescription.innerText = indicator.description,
        indProgress.innerText = `${Math.round(indicator.progress)}%`
    };
};


// Create event handler for each goal's button
const inputGoals = document.querySelectorAll('#spa-goal-code');

for (const inputGoal of inputGoals) {

    inputGoal.addEventListener('click', (evt) => {

        const inputGoalEle = inputGoal.querySelector('.spa-test-in');
        console.log(inputGoalEle);
        const goalcode = Number(inputGoalEle.innerText);
        
        fetch(`/progress_data.json/${goalcode}`)
        .then(response => response.json())
        .then(responseJson => {
            const progress_data = {
                code: responseJson.code,
                title: responseJson.title,
                description: responseJson.description,
                progress: responseJson.progress,
                years_from_start: responseJson.ytd,
                indicators: responseJson.indicators
            };
            
            drawProgress(progress_data.progress);

            drawPie(progress_data.years_from_start);

            drawBurn(progress_data.progress, progress_data.years_from_start);

            updateText(progress_data.code, progress_data.title, progress_data.description);

            console.log(progress_data.indicators);
            console.log(progress_data.indicators[0]);
            console.log(progress_data.indicators[0].id);
            console.log(progress_data.indicators[0].description);
            console.log(progress_data.indicators[0].progress);
            listIndicators(progress_data.indicators);
        });
    });
};