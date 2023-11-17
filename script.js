// Notification Menu Display
const notification = document.querySelector('.notification.menu');
const notificationMenu = document.querySelector('.notification.selection');
// Notification Close
const notificationClose = document.querySelector('.notification.message-close')
// Display None Notification
const displayNoNotification = document.querySelector('.notification.none')
//Notification Icon
const notificationIcon = document.querySelector('.notification.icon')

// Profile Menu Display
const profile = document.querySelector('.profile.main.info');
let profileMenu = document.querySelector('.profile.selection');
// Status
const statusSelection = document.querySelectorAll('input[type="radio"][name="status"]');
const statusIndicator = document.querySelector('.profile.main.info')
// Profile
const profileSelection = document.querySelectorAll('input[type="radio"][name="profiles"]');
const profileImage = document.querySelectorAll('.profile.image');
//Profile Click Setup
const profileImageSide = document.querySelector('.profile.image.side')
const profileText = document.querySelector('.profile.name')


// Search Input
const searchInput = document.querySelector('input#search');
const cancelSearch = document.querySelector('.search-cancel')
const searchResultDialog = document.querySelector('.search-dialog')

//Recents Addition
const inputAlertDescription = document.querySelector('#alert-description')
const alertLevelSelect = document.querySelector('#alert-level')
const addAlertsRecents = document.querySelector('.add-recents')

let timeout = false;


function removeNoneDisplay(e) {

    if (e.currentTarget === profile) {
        profileMenu.style.removeProperty('display');

        document.addEventListener('click', (e) => {

            if (!e.target.closest('.profile.selection') &&
                !(e.target === profileImageSide || e.target === profileText || e.target === profile))
                profileMenu.style.setProperty('display', 'none')

        })

    }
    else {
        notificationMenu.style.removeProperty('display');

        document.addEventListener('click', (e) => {

            if (!e.target.closest('.notification.selection') &&
                !(e.target === notificationIcon || e.target === notification))
                notificationMenu.style.setProperty('display', 'none')
        })

    }

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

//TODO - Re-check to add event listener on element

function removeElementOnInputEvent() {

    clearTimeout(timeout);

    let inputRecentCheck = document.querySelectorAll('input.recent.check');

    (inputRecentCheck).forEach(checkbox => checkbox.addEventListener('input', (e) => {

        // console.log('Ran on Input Checkbox')

        timeout = setTimeout(() => {
            e.target.parentElement.remove()

            alertList.forEach((alert, index) => {
                if (alert.sort == e.target.dataset.sort)
                    alertList.splice(index, 1)
            })

            if (alertList.length == 0) {
                console.log('noted')

                document.querySelector('.recent.none').style.removeProperty('display');
            }

        }, 500)

    }));

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

    if (inputAlertDescription.value.length === 0) return false
    let sort = alertList.length

    // Account for missing in-between sorts too
    let alertListSort = []
    for (let alert of alertList) {
        alertListSort.push(parseInt(alert.sort))
    }

    while (alertListSort.includes(sort)) sort++

    let alertObj = {
        'sort': `${sort}`,
        'description': `${inputAlertDescription.value}`,
        'level': `${alertLevelSelect.value}`
    }

    inputAlertDescription.value = '';

    alertList.push(alertObj);

    createRecentList(alertObj);

    // rendering elements again, removes events, thus adding again.
    removeElementOnInputEvent();

});

removeElementOnInputEvent();