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
});

// 3. Creating a progress chart using progress data