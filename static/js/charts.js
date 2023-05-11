'use strict';


// AJAX fetch for SDG progress data

const goalcode = document.querySelector('#goalcode').innerHTML;

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

    console.log(progress_data)

    new Chart(document.querySelector('#burndown'), {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'baseline',
                    data: {15: 0, 30: 100}
                },
                // {
                //     label: 'actual',
                //     data: {(15 + progress_data.years_from_start): progress_data.progress}
                // },
            ],
        },
        options: {
            scales: {
                x: {
                    // min: 2015,
                    // max: 2030
                },
                y: {}
            },
        }
    });
});


new Chart(document.querySelector('#test-line'), {
    type: 'line',
    data: {
        datasets: [{
            label: 'test',
            data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
        }]
    },
    options: {
    }
});