let alertList = [
    {
        'sort': '0',
        'description': 'Upgrade Successfully Completed',
        'level': 'alert'
    },
    {
        'sort': '1',
        'description': 'Unkown User Login without Verification',
        'level': 'warning'
    },
    {
        'sort': '2',
        'description': 'Performance Issues Encountered',
        'level': 'alert'
    },
    {
        'sort': '3',
        'description': 'Compatibility Issues',
        'level': 'alert'
    },
    {
        'sort': '4',
        'description': 'New Account Creation',
        'level': 'alert'
    },
    {
        'sort': '5', 'description':
            'Upgrade Insider Packages Warnings',
        'level': 'warning'
    },
    {
        'sort': '6',
        'description': 'Errors on Program Re-Run',
        'level': 'error'
    },
    {
        'sort': '7',
        'description': 'Critical Error on Server',
        'level': 'critical'
    }
]

let renderedAlertList = ''

let recentBody = document.querySelector('.recents.body')

function createRecentList() {
    renderedAlertList = alertList.map(alert => {

        let div = document.createElement('div');
        div.classList.add('recent');

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('id', alert.level + alert.sort);
        input.classList.add('recent', 'check', `${alert.level}-tag`);

        let label = document.createElement('label');
        label.setAttribute('for', `${alert.level + alert.sort}`)
        label.classList.add('recent', 'text', `${alert.level}-tag`)
        label.setAttribute('data-type', `${alert.level}`)
        label.innerText = `${alert.description}`

        div.appendChild(input)
        div.appendChild(label)

        return div
    });

    renderedAlertList.forEach(element => {
        recentBody.appendChild(element);
    });
}

createRecentList();