'use strict';

// event handler experiment

const button = document.querySelector('#angry-button');

function handleClick() {
    alert('Stop clicking me!');
}

button.addEventListener('click', handleClick);

// AJAX fetch for SDG progress data

const goalcode = document.querySelector('#goal-code').innerHTML;

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

    new Chart(document.querySelector('#time-pie'), {
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


    const test_burn = document.querySelector('#burndown');

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

//     new Chart(document.querySelector('#burndown'), {
//         type: 'line',
//         data: {
//             datasets: [{
//                 label: 'baseline',
//                 data: [
//                     {'x': 15, 'y': 0},
//                     {'x': 30, 'y': 100}
//                 ]},
//                 {
//                 label: 'actual',
//                 data: [
//                     {'x': 15, 'y': 0,},
//                     {'x': 19, 'y': 50}
//                 ]}  
//                 ]
//             }
//     });
// });


// new Chart(document.querySelector('#test-line'), {
//     type: 'line',
//     data: {
//         datasets: [{
//             label: 'test',
//             data: {
//                 5: 20,
//                  10: 30
//                 }
//         },
//         {
//             label: 'test2',
//             data: {
//                 1: 3,
//                 7: 14
//             }
//         }
//         ]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// // test custom properties chart

// new Chart(document.querySelector('#custom-objs'), {
//     type: 'bar',
//     data: {
//       datasets: [{
//         data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
//       }]
//     },
//     options: {
//       parsing: {
//         xAxisKey: 'id',
//         yAxisKey: 'nested.value'
//       }
//     }
});


// AJAX fetch for indicator progress data

// const ind_id2 = document.querySelector('#indicator-id-2').innerHTML;
// console.log(ind_id2);

// fetch(`/indicator_data.json/${ind_id2}`)
// .then(response => response.json())
// .then(responseJson => {
//     const progress_data = {
//         progress: responseJson.progress,
//         years_from_start: responseJson.ytd
//     };

//     new Chart(document.querySelector('#ind-progress-bar-2'), {
//         type: 'bar',
//         data: {
//             labels: [''],
//             datasets: [
//                 {
//                     label: 'progress',
//                     data: [progress_data.progress],
//                 },
//             ],
//         },
//         options: {
//             indexAxis: 'y',
//             scales: {
//                 x: {
//                     max: 100,
//                     ticks: {
//                         callback: value => `${value}%`
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 },
//                 tooltip: {
//                     enabled: false
//                 }
//             }
//         }
//     });
// })