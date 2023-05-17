'use strict';

// AJAX fetch for indicator progress data

const ind_id = document.querySelector('#indicator-id').innerHTML;
console.log(ind_id);

fetch(`/indicator_data.json/${ind_id}`)
.then(response => response.json())
.then(responseJson => {
    const progress_data = {
        progress: responseJson.progress,
        years_from_start: responseJson.ytd
    };

    new Chart(document.querySelector('#ind-progress-bar'), {
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
})
