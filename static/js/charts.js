'use strict';


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

    new Chart(document.querySelector('#progress-bar'), {
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
                        callback: value => `${value}%`
                    }
                }
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
                }
            }
        },
    });

    // Burndown chart of both data points (progress and years)

    // let burn_progress = progress_data.progress;
    // let burn_years = progress_data.years_from_start;

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