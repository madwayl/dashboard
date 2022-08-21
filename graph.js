let bars = document.querySelectorAll('.bars')

let barsArray = [];

let overview = document.querySelectorAll('.alert.overview.in');

function generateGraphPercentage() {

    barsArray = []

    for (let i = 0; i < 6; i++) {

        let infoPer, warningPer, errorPer, fatalPer;

        infoPer = Math.random() * (99 - 60) + 60
        warningPer = Math.random() * (infoPer - 45) + 45
        errorPer = Math.random() * (warningPer - 25) + 25
        fatalPer = Math.random() * (errorPer - 1) + 1

        barsArray.push([infoPer, warningPer, errorPer, fatalPer])

        for (let j = 0; j < 4; j++) {
            bars[i].children[j].style.setProperty('height', `${barsArray[i][j]}%`)
        }

        if (i === 5) {
            infoVal = 200 * infoPer / 100
            warningVal = 200 * warningPer / 100
            errorVal = 200 * errorPer / 100
            fatalVal = 200 * fatalPer / 100

            let finalBarValue = [infoVal, warningVal, errorVal, fatalVal]

            for (let j = 0; j < 4; j++) {
                overview[j].children[1].textContent = parseInt(finalBarValue[j]);

                if (barsArray[i - 1][j] > barsArray[i][j]) {
                    overview[j].classList.remove('up');
                    overview[j].classList.add('down');
                } else {
                    overview[j].classList.remove('down');
                    overview[j].classList.add('up');
                }
            }

        }

    }

}

generateGraphPercentage();