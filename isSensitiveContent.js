const sensitiveImages = document.querySelectorAll('.content-warning-img')



if (sensitiveImages) {
    const isRemoveContentCookie = getCookie('isRemoveContentWarning');



    $(function () {
        // Initialize popovers
        $('[data-toggle="popover"]').popover({
            trigger: 'hover', // Show popover on hover
            html: true // Allow HTML content
        });
    });

    sensitiveImages.forEach(image => {
        const previousPageUrl = document.referrer;
        const currPageUrl = window.location.href
        const isPrevPage = previousPageUrl && previousPageUrl !== currPageUrl
        const divContainer = document.createElement('div');
        divContainer.classList.add('content-warning-container')
        image.parentNode.insertBefore(divContainer, image);
        !isRemoveContentCookie && image.classList.add('blur-img')
        image.classList.add('content-warning-image')
        const sensitiveContentContainer = document.createElement('div')
        sensitiveContentContainer.classList.add('sensitive-content-container')
        sensitiveContentContainer.innerHTML = `
        <div class="content-warning-btns ${isRemoveContentCookie ? 'd-none' : 'd-flex'}">
        <div class="return-to-prev flex-fill">
            <button onclick="handleImgSettingsClick(event)"
                class="btn w-100 rounded-0 show-content-btn return-page-btn">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                <p>Return to ${isPrevPage ? 'previous page' : 'home page'}</p>
            </button>
        </div>
        <div class="view-settings flex-fill">
            <div class="view-label ">
                    Show Image:<i class="fa fa-eye"></i>
            </div>
            <div class="view-btns">
                <button onclick="handleImgSettingsClick(event)"
                    class="btn w-100  rounded-0 show-content-btn show-once-btn">
                    Once
                </button>
                <button onclick="handleImgSettingsClick(event)"
                    class="btn w-100  rounded-0 show-content-btn show-always-btn">
                    Always
                </button>
            </div>
        </div>
    </div>


        <i onclick="showImageSettings(event)" class="fa fa-cog show-settings-icon ${isRemoveContentCookie ? 'd-flex' : 'd-none'} "></i>


        `
        divContainer.append(image, sensitiveContentContainer);
    })

    function handleImgSettingsClick(event) {
        const settingsBtn = event.target;
        const parentContainer = settingsBtn.closest('.content-warning-container')
        const image = parentContainer.querySelector('.content-warning-img')
        const settingsContainer = parentContainer.querySelector('.content-warning-btns')
        const showSettingsIcon = parentContainer.querySelector('.show-settings-icon')

        if (settingsBtn.classList.contains('show-once-btn')) {
            removeImageBlur(event.target)
        } else if (settingsBtn.classList.contains('show-always-btn')) {
            const allShowImgBtns = document.querySelectorAll('.show-once-btn')
            allShowImgBtns.forEach(btn => {
                btn.click()
            })
            setCookie("isRemoveContentWarning", "true", 400);
        } else {
            console.log('this ran')
            const previousPageUrl = document.referrer;
            const currPageUrl = window.location.href
            const isPrevPage = previousPageUrl && previousPageUrl !== currPageUrl
            const url = isPrevPage ? previousPageUrl : 'https://www.floridamemory.com/'
            window.location.href = url;
        }
    }

    const removeImageBlur = (settingsBtn) => {

        const parentContainer = settingsBtn.closest('.content-warning-container')
        const image = parentContainer.querySelector('.content-warning-img')
        const settingsContainer = parentContainer.querySelector('.content-warning-btns')
        const showSettingsIcon = parentContainer.querySelector('.show-settings-icon')
        image.classList.remove('blur-img')
        settingsContainer.classList.remove('d-none')
        $(settingsContainer).removeClass('d-flex').addClass('d-none')
        $(showSettingsIcon).removeClass('d-none').addClass('d-flex')
    }



    function showImageSettings(event) {
        const showSettingsIcon = event.target;
        const parentContainer = showSettingsIcon.closest('.content-warning-container')
        const settingsContainer = parentContainer.querySelector('.content-warning-btns')
        $(showSettingsIcon).removeClass('d-flex').addClass('d-none')
        $(settingsContainer).removeClass('d-none').addClass('d-flex')
    }

}

function setCookie(name, value, days) {
    const date = new Date();
    // Set the expiration date to a long time in the future (e.g., 400 days)
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Set the cookie
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}