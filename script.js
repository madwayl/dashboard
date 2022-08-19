
const notification = document.querySelector('.notification.menu');
const notificationMenu = document.querySelector('.notification.selection');

const profile = document.querySelector('.profile.main.info');
let profileMenu = document.querySelector('.profile.selection');

const statusSelection = document.querySelectorAll('input[type="radio"][name="status"]');
const statusIndicator = document.querySelector('.profile.main.info')

const profileSelection = document.querySelectorAll('input[type="radio"][name="profiles"]');
const profileImage = document.querySelectorAll('.profile.image')

const notificationClose = document.querySelector('.notification.message-close')

const displayNone = document.querySelector('.notification.none')


function removeNoneDisplay(e) {
    console.log(e.target)
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
    displayNone.style.removeProperty('display')
    notification.classList.remove('notify')
}

profile.addEventListener('click', removeNoneDisplay);

notification.addEventListener('click', removeNoneDisplay);

profileMenu.addEventListener('mouseleave', addNoneDisplay);

notificationMenu.addEventListener('mouseleave', addNoneDisplay);

Array.from(statusSelection).forEach(status => status.addEventListener('change', changeStatusIndicator));

Array.from(profileSelection).forEach(profile => profile.addEventListener('change', changeProfileImage));

notificationClose.addEventListener('click', removeNotification)




