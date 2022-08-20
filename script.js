// Notification Menu Display
const notification = document.querySelector('.notification.menu');
const notificationMenu = document.querySelector('.notification.selection');
// Notification Close
const notificationClose = document.querySelector('.notification.message-close')
// Display None Notification
const displayNoNotification = document.querySelector('.notification.none')

// Profile Menu Display
const profile = document.querySelector('.profile.main.info');
let profileMenu = document.querySelector('.profile.selection');
// Status
const statusSelection = document.querySelectorAll('input[type="radio"][name="status"]');
const statusIndicator = document.querySelector('.profile.main.info')
// Profile
const profileSelection = document.querySelectorAll('input[type="radio"][name="profiles"]');
const profileImage = document.querySelectorAll('.profile.image');

// Search Input
const searchInput = document.querySelector('input#search');
const cancelSearch = document.querySelector('.search-cancel')
const searchResultDialog = document.querySelector('.search-dialog')

//Recents Addition
const inputAlertDescription = document.querySelector('#alert-description')
const alertLevelSelect = document.querySelector('#alert-level')
const addAlertsRecents = document.querySelector('.add-recents')


function removeNoneDisplay(e) {
    // console.log(e.target)
    if (e.currentTarget === profile)
        profileMenu.style.removeProperty('display');
    else
        notificationMenu.style.removeProperty('display');
}

function addNoneDisplay(e) {
    e.target.style.setProperty('display', 'none');
}

function changeStatusIndicator(e) {
    const status = e.target.id
    if (status == 'online') {
        statusIndicator.classList.add(status)
        statusIndicator.classList.remove('offline')
        statusIndicator.classList.remove('busy')
    }
    else if (status == 'offline') {
        statusIndicator.classList.add(status)
        statusIndicator.classList.remove('onlinr')
        statusIndicator.classList.remove('busy')
    } else {
        statusIndicator.classList.add(status)
        statusIndicator.classList.remove('offline')
        statusIndicator.classList.remove('online')
    }
}

function changeProfileImage(e) {
    const imgLocation = e.target.nextSibling.firstElementChild.getAttribute('src');
    profileImage.forEach(elem => elem.setAttribute('src', imgLocation))

    statusIndicator.classList.add('online')
    statusIndicator.classList.remove('offline')
    statusIndicator.classList.remove('busy')

    document.querySelector('input#online').checked = true;
}

function removeNotification(e) {
    e.target.parentElement.remove()
    displayNoNotification.style.removeProperty('display')
    notification.classList.remove('notify')
}

profile.addEventListener('click', removeNoneDisplay);

notification.addEventListener('click', removeNoneDisplay);

profileMenu.addEventListener('mouseleave', addNoneDisplay);

notificationMenu.addEventListener('mouseleave', addNoneDisplay);

Array.from(statusSelection).forEach(status => status.addEventListener('change', changeStatusIndicator));

Array.from(profileSelection).forEach(profile => profile.addEventListener('change', changeProfileImage));

notificationClose.addEventListener('click', removeNotification)

searchInput.addEventListener('input', (e) => {

    const searchResultNone = document.querySelector('.results.body > .result.none')

    let searchItem = e.target.value;

    let searchResult = [];

    if (searchItem.length > 0) {
        e.target.nextElementSibling.classList.add('show');

        for (let alert of alertList) {
            // console.log(alert.description)
            if (alert.description.toLowerCase().includes(searchItem.toLowerCase()) || alert.level.includes(searchItem.toLowerCase())) {
                searchResult.push(alert)
            }
        }

    } else {
        e.target.nextElementSibling.classList.remove('show');
    }

    // console.log(alertList)

    if (searchResult.length === 0) {
        searchResultNone.style.removeProperty('display')
    } else {
        searchResultNone.style.setProperty('display', 'none')

    }

    renderSearchResult(searchResult)
});


const searchDialogBody = document.querySelector('a.result.find');

searchInput.addEventListener('focus', () => {
    searchResultDialog.style.removeProperty('display')
    // console.log('focused Search')
})

searchInput.addEventListener('blur', () => {
    searchResultDialog.style.setProperty('display', 'none')
    // console.log('focused out Search')
})

cancelSearch.addEventListener('click', () => {
    searchInput.value = '';
    cancelSearch.classList.remove('show')
})

alertLevelSelect.addEventListener('change', () => {

    alertLevelSelect.className = `${alertLevelSelect.value}-select`
})

addAlertsRecents.addEventListener('click', () => {

    let alertObj = {
        'sort': `${alertList.length}`,
        'description': `${inputAlertDescription.value}`,
        'level': `${alertLevelSelect.value}`
    }

    alertList.push(alertObj);

    createRecentList(alertObj)
})