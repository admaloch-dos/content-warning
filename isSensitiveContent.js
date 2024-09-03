const graphicImages = document.querySelectorAll('.content-warning-img')



if (graphicImages) {
    const isRemoveContentCookie = getCookie('isRemoveContentWarning');



    $(function () {
        // Initialize popovers
        $('[data-toggle="popover"]').popover({
            trigger: 'hover', // Show popover on hover
            html: true // Allow HTML content
        });
    });

    graphicImages.forEach(image => {
        const previousPageUrl = document.referrer;
        const currPageUrl = window.location.href

        console.log('prev page:', previousPageUrl)
        console.log('curr page:', currPageUrl)
        const isPrevPage = previousPageUrl && previousPageUrl !== currPageUrl

        const graphicContentText = document.createElement('div');
        graphicContentText.classList.add('graphic-content-text')
        graphicContentText.innerHTML = `
        <h4 class = "text-center">
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        Warning: <br>
            This item contains graphic content. <br>
            Viewer discretion is advised.
        </h4>
        `

        const divContainer = document.createElement('div');
        divContainer.classList.add('content-warning-container')
        image.parentNode.insertBefore(divContainer, image);
        !isRemoveContentCookie && image.classList.add('blur-img')
        image.classList.add('content-warning-image')
        const graphicContentContainer = document.createElement('div')
        graphicContentContainer.classList.add('graphic-content-container')
        graphicContentContainer.innerHTML = `
        <div class="content-warning-btns ${isRemoveContentCookie ? 'd-none' : 'd-flex'}">
            <div class="return-to-prev flex-fill">
                <button onclick="handleImgSettingsClick(event)"
                    class="btn w-100 rounded-0 show-content-btn return-page-btn">
                    <i class="fa fa-arrow-left return-page-arrow" aria-hidden="true"></i>
                    <p>Return to ${isPrevPage ? 'previous page' : 'home page'}</p>
                </button>
            </div>
            <div class="view-settings flex-fill">

                <div class="view-btns">
                    <button onclick="handleImgSettingsClick(event)"
                        class="btn w-100  rounded-0 show-content-btn show-once-btn">
                        <i class="fa fa-eye "></i> Show image once
                    </button>
                    <button onclick="handleImgSettingsClick(event)"
                        class="btn w-100  rounded-0 show-content-btn show-always-btn">
                        <i class="fa fa-ban" aria-hidden="true"></i>
  Disable content warnings
                    </button>
                </div>
            </div>
        </div>


        <i onclick="showImageSettings(event)" class="fa fa-cog show-settings-icon ${isRemoveContentCookie ? 'd-flex' : 'd-none'} "></i>


        `
        divContainer.append(image, graphicContentText, graphicContentContainer);
    })

    function handleImgSettingsClick(event) {
        const settingsBtn = event.target;
        const parentContainer = settingsBtn.closest('.content-warning-container')
        const image = parentContainer.querySelector('.content-warning-img')
        const settingsContainer = parentContainer.querySelector('.content-warning-btns')
        const showSettingsIcon = parentContainer.querySelector('.show-settings-icon')

        if (settingsBtn.classList.contains('show-once-btn')) {
            removeImageWarning(event.target)
        } else if (settingsBtn.classList.contains('show-always-btn')) {
            const allShowImgBtns = document.querySelectorAll('.show-once-btn')
            allShowImgBtns.forEach(btn => {
                btn.click()
            })

            // setCookie("isRemoveContentWarning", "true", 400);
        } else {
            console.log('this ran')
            const previousPageUrl = document.referrer;
            const currPageUrl = window.location.href
            const isPrevPage = previousPageUrl && previousPageUrl !== currPageUrl
            const url = isPrevPage ? previousPageUrl : 'https://www.floridamemory.com/'
            window.location.href = url;
        }
    }

    const removeImageWarning = (settingsBtn) => {

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