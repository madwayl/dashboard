let alertList = [
    {
        'sort': '0',
        'description': 'Upgrade Successfully Completed',
        'level': 'info'
    },
    {
        'sort': '1',
        'description': 'Login without Verification',
        'level': 'warning'
    },
    {
        'sort': '2',
        'description': 'Performance Issues Encountered',
        'level': 'info'
    },
    {
        'sort': '3',
        'description': 'Compatibility Issues',
        'level': 'info'
    },
    {
        'sort': '4',
        'description': 'New Account Creation',
        'level': 'info'
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
        'level': 'fatal'
    }
]

// let renderedAlertList;

let recentBody = document.querySelector('.recents.body')
let searchResultBody = document.querySelector('.results.body')

function createRecentList(list) {

    if (alertList.length) {
        document.querySelector('.recent.none').style.setProperty('display', 'none');
    } else {
        document.querySelector('.recent.none').style.removeProperty('display');
    }

    if (!alertList.length) return

    function createDiv(alert) {

        let div = document.createElement('div');
        div.classList.add('recent');

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('id', alert.level + alert.sort);
        input.setAttribute('data-sort', `${alert.sort}`)
        input.classList.add('recent', 'check', `${alert.level}-tag`);

        let label = document.createElement('label');
        label.setAttribute('for', `${alert.level + alert.sort}`)
        label.classList.add('recent', 'text', `${alert.level}-tag`)
        label.setAttribute('data-type', alert.level)
        label.innerText = alert.description

        div.appendChild(input)
        div.appendChild(label)

        return div
    }

    if (list.length) {

        list.map(createDiv).forEach(element => {
            recentBody.appendChild(element);
        });

    } else {
        recentBody.appendChild(createDiv(list))
    }

}

function renderSearchResult(searchResult) {

    document.querySelectorAll('.result.find').forEach(previousResults => previousResults.remove())

    searchResult.forEach(search => {

        let div = document.createElement('div');
        div.classList.add('result', 'find', `${search.level}-tag`);
        div.setAttribute('data-type', search.level)
        div.innerText = search.description

        searchResultBody.appendChild(div)
    })
}

createRecentList(alertList);