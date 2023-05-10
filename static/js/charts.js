'use strict';

new Chart(document.querySelector('#progress-chart'), {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [
            {
                label: 'YTD',
                data: [10],
            },
        ],
    },
    options: {
        indexAxis: 'y',
    }
});