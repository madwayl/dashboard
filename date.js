let currentDate = new Date()

let dateLimit = currentDate.getFullYear().toString() + '-' + (currentDate.getMonth() + 1) < 10 ? (currentDate.getMonth() + 1).toString.padStart(2,'0') : (currentDate.getMonth() + 1).toString()

let monthControl = document.querySelector('input[type="month"]');

monthControl.value = dateLimit;
monthControl.setAttribute('max', dateLimit)

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let showMonths = []

let monthNum = parseInt(currentDate.getMonth())

let monthOnGraph = document.querySelectorAll('p.bar.name')

function generateMonths(month) {
    showMonths = []
    month = parseInt(month)

    for (let i = 0; i < 6; i++) {
        showMonths.unshift(months[(month + months.length) % months.length])
        month--;
    }
}

function setMonthOnGraph() {
    let monthArrayStart = 0
    for (let name of monthOnGraph) {
        name.textContent = showMonths[monthArrayStart]
        monthArrayStart++;
    }
}

generateMonths(monthNum);

setMonthOnGraph();

monthControl.addEventListener('change', (e) => {
    monthNum = parseInt(e.target.value.split('-')[1] - 1)
    generateMonths(monthNum);
    setMonthOnGraph();
    generateGraphPercentage();
})
