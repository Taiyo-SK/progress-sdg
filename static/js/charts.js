'use strict';

// 1. Testing a chart

// new Chart(document.querySelector('#progress-chart'), {
//     type: 'bar',
//     data: {
//         labels: [''],
//         datasets: [
//             {
//                 label: 'progress',
//                 data: [50],
//             },
//         ],
//     },
//     options: {
//         indexAxis: 'y',
//     }
// });

// 2. AJAX fetch for SDG progress data
const goalcode = document.querySelector('#goalcode').innerHTML;
console.log(goalcode);

fetch(`/progress_data.json/${goalcode}`)
.then(response => response.json())
.then(responseJson => {
    console.log(responseJson)
    const progress_data = {
        progress: responseJson.progress,
        years_from_start: responseJson.ytd
    };
    
    new Chart(document.querySelector('#progress-chart'), {
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
        }
    });

    // new Chart(document.querySelector('#progress-chart-ajax'), {
    //     type: 'bar',
    //     data: {
    //         labels: [''],
    //         datasets: [
    //             {
    //                 label: 'YTD',
    //                 data: [15],
    //             },
    //         ],
    //     },
    //     options: {
    //         indexAxis: 'y',
    //     }
    // });
});

// 3. Creating a progress chart using progress data