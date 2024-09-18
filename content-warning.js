//Notes:
// Certain img and vids will get a class of .content-warning-img on the backend
// this script will check if any images contain that class, if so, it will create an overlay and add it

const contentWarningImgs = document.querySelectorAll('.content-warning-img')

if (contentWarningImgs) {

    // Initialize popovers w bootstrap
    $(function () {
        $('[data-toggle="popover"]').popover({
            trigger: 'hover',
            html: true
        });
    });

    const addBlurContent = () => {
        // ADD img blur for main img and thumbnail
        $('.float_imgPreview, .hide_FloatImg').css({
            'display': 'none',
        });

        $('.content-warning-img, .float_imgPreview img').css({
            'filter': 'blur(1rem)'
        });
    }

    const removeBlurContent = () => {
        // Remove img blur for main img and thumbnail

        $(' .float_imgPreview, .hide_FloatImg').css({
            'display': 'block'
        });

        $('.content-warning-img, .float_imgPreview img').css({
            'filter': 'none'
        });
    }

    //grab cookie if it exists
    let isRemoveContentCookie = getCookie('isRemoveContentWarning');

    if (isRemoveContentCookie) {
        removeBlurContent()
    } else {
        addBlurContent()
    }

    const previousPageUrl = document.referrer;
    const currPageUrl = window.location.href
    const isPrevPage = previousPageUrl && previousPageUrl !== currPageUrl

    // loop over array of images
    contentWarningImgs.forEach(image => {
        const contentWarningOverlay = document.createElement('div');
        contentWarningOverlay.classList.add('content-warning-container');
        if (!isRemoveContentCookie) {
            contentWarningOverlay.classList.add('overflow-hidden');
        }
        image.parentNode.insertBefore(contentWarningOverlay, image);
        if (!isRemoveContentCookie) {
            image.classList.add('blur-img')
        } else {
            image.style.filter = 'none';
        }
        const contentContainer = document.createElement('div');
        contentContainer.innerHTML = `
        <div class="content-warning-main ${isRemoveContentCookie ? 'd-none' : 'd-flex'}">
        <div class="content-warning-text d-flex align-items-center justify-content-center">
        <div class="content-warning-text-items d-flex flex-column">
            <h5 class="text-center">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Warning:</h5>


                <p>
                Florida Memory blurs historic imagery which depicts acts of violence, severe bodily harm, or profound inhumanity. Users have the choice to view a specific image or to view all images by default. See our <a href="https://floridamemory.com/learn/about/guidelines.php">policy statement</a>
                for more information.
                </p>

        </div>
        </div>
        <div class="disable-warning-btns d-flex">
            <div class="return-to-prev flex-fill">
                <button onclick="handleReturnToDiffPage()"
                    class="btn w-100 rounded-0 show-content-btn return-page-btn">
                    <i class="fa fa-arrow-left return-page-arrow" aria-hidden="true"></i>
                    <p>Return to ${isPrevPage ? 'previous page' : 'home page'}</p>
                </button>
            </div>
            <div class="view-item-settings flex-fill">


                <button onclick="handleShowItemOnce(event)"
                    class="btn w-100  rounded-0 show-content-btn show-once-btn">
                    <span class="show-img-span"><i class="fa fa-eye "></i> Show item once</span>
                </button>
                <button data-toggle="modal" data-target="#contentWarningModal"
                    class="btn w-100  rounded-0 show-content-btn disable-content-warnings-btn update-warning-settings">
                    <i class="fa fa-ban mr-1" aria-hidden="true"></i>
                    Disable content warnings
                    <span onclick="handleCookieIconClick(event)" class="cookie-settings-icon" data-toggle="popover"
                        data-placement="top"
                        data-content="Cookies are used to remember your content warning settings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-cookie" viewBox="0 0 16 16">
                            <path
                                d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4.5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            <path
                                d="M8 0a7.96 7.96 0 0 0-4.075 1.114q-.245.102-.437.28A8 8 0 1 0 8 0m3.25 14.201a1.5 1.5 0 0 0-2.13.71A7 7 0 0 1 8 15a6.97 6.97 0 0 1-3.845-1.15 1.5 1.5 0 1 0-2.005-2.005A6.97 6.97 0 0 1 1 8c0-1.953.8-3.719 2.09-4.989a1.5 1.5 0 1 0 2.469-1.574A7 7 0 0 1 8 1c1.42 0 2.742.423 3.845 1.15a1.5 1.5 0 1 0 2.005 2.005A6.97 6.97 0 0 1 15 8c0 .596-.074 1.174-.214 1.727a1.5 1.5 0 1 0-1.025 2.25 7 7 0 0 1-2.51 2.224Z" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
    <div class="enable-warning-btns d-none">
        <button data-toggle="modal" data-target="#contentWarningModal"
            class="btn d-flex justify-content-center align-items-center w-100  rounded-0 enable-content-warning-btn update-warning-settings">
            <i class="fa fa-check-circle mr-1" aria-hidden="true"></i>
            Enable content warnings
            <span onclick="handleCookieIconClick(event)" class="cookie-settings-icon" data-toggle="popover"
                data-placement="top" data-content="Cookies are used to remember your content warning settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-cookie" viewBox="0 0 16 16">
                    <path
                        d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4.5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path
                        d="M8 0a7.96 7.96 0 0 0-4.075 1.114q-.245.102-.437.28A8 8 0 1 0 8 0m3.25 14.201a1.5 1.5 0 0 0-2.13.71A7 7 0 0 1 8 15a6.97 6.97 0 0 1-3.845-1.15 1.5 1.5 0 1 0-2.005-2.005A6.97 6.97 0 0 1 1 8c0-1.953.8-3.719 2.09-4.989a1.5 1.5 0 1 0 2.469-1.574A7 7 0 0 1 8 1c1.42 0 2.742.423 3.845 1.15a1.5 1.5 0 1 0 2.005 2.005A6.97 6.97 0 0 1 15 8c0 .596-.074 1.174-.214 1.727a1.5 1.5 0 1 0-1.025 2.25 7 7 0 0 1-2.51 2.224Z" />
                </svg>
            </span>
        </button>
    </div>
    <i onclick="handleSettingsIconClick(event)"
        class="fa fa-cog show-settings-icon ${isRemoveContentCookie ? 'd-flex' : 'd-none'} ">
    </i>
    <!-- Modal -->
    <div class="modal fade w-100" id="contentWarningModal" tabindex="-1" role="dialog"
        aria-labelledby="contentWarningModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <p> This will <span id="enable-disable-span">${isRemoveContentCookie ? 'enable' :
                'disable'}</span> content warnings for all graphic content on the site and remember your
                        settings for future visits. Would you like to proceed?</p>
                    <button onclick="updateWarningSettings(event)" type="button" class="btn custom-btn"
                        data-dismiss="modal"><i class="fa fa-check-circle check-icon" aria-hidden="true"></i>
                        Yes</button>
                    <button type="button" class="btn custom-btn" data-dismiss="modal"><i
                            class="fa fa-times-circle cross-icon" aria-hidden="true"></i>
                        No</button>
                </div>
            </div>
        </div>
    </div>
        `
        contentWarningOverlay.append(image, contentContainer);
    })

    //for when user clicks to show temporarily
    function handleShowItemOnce(event) {
        const parentContainer = event.target.closest('.content-warning-container')
        const image = parentContainer.querySelector('.content-warning-img')
        if (image.classList.contains('blur-img')) {
            parentContainer.classList.add('image-showed-once')
        } else {
            parentContainer.classList.remove('image-showed-once')
        }
        hideAndRevealWarning(event.target)
    }

    //handle hiding and revealing an image content warning overlay
    const hideAndRevealWarning = (input) => {
        const parentContainer = input.closest('.content-warning-container')
        const image = parentContainer.querySelector('.content-warning-img')
        const enableSettingsContainer = parentContainer.querySelector('.enable-warning-btns')
        const enableDisableSpan = document.querySelector('#enable-disable-span')
        const contentWarningText = parentContainer.querySelector('.content-warning-text')
        const showImageSpan = parentContainer.querySelector('.show-img-span')

        if (image.classList.contains('blur-img')) {
            $('.content-warning-main, .content-warning-text').removeClass('d-flex').addClass('d-none')
            $('.show-settings-icon').removeClass('d-none').addClass('d-flex')
            $(parentContainer).removeClass('overflow-hidden')
            removeBlurContent()
            $(image).removeClass('blur-img')
            showImageSpan.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i> Hide item once'
            if (!parentContainer.classList.contains('image-showed-once')) {
                enableDisableSpan.innerText = 'enable'
            }
        } else {
            $('.content-warning-main, .content-warning-text').addClass('d-flex').removeClass('d-none')
            $(enableSettingsContainer).addClass('d-none').removeClass('d-flex')
            $('.show-settings-icon').addClass('d-none').removeClass('d-flex')
            $(parentContainer).addClass('overflow-hidden')
            $(contentWarningText).removeClass('d-none')
            addBlurContent()
            $(image).addClass('blur-img')
            showImageSpan.innerHTML = '<i class="fa fa-eye "></i> Show item once'
            if (!parentContainer.classList.contains('image-showed-once')) {
                enableDisableSpan.innerText = 'disable'
            }
        }
        resetVideos()
    }

    //disable or enable warnings btn opens modal. This runs on yes click
    function updateWarningSettings(event) {
        const allWarningItems = document.querySelectorAll('.content-warning-container')
        if (!isRemoveContentCookie) {
            setCookie("isRemoveContentWarning", "true", 400);
            isRemoveContentCookie = true
        } else {
            deleteCookie('isRemoveContentWarning')
            isRemoveContentCookie = false
        }
        allWarningItems.forEach(item => {
            if (item.classList.contains('image-showed-once')) {
                const showOnceBtn = item.querySelector('.show-once-btn')
                showOnceBtn.click()
            }
            hideAndRevealWarning(item)
        })
    }

    //image settings btn show
    function handleSettingsIconClick(event) {
        const showSettingsIcon = event.target;
        const parentContainer = showSettingsIcon.closest('.content-warning-container')
        const disableSettingsContainer = parentContainer.querySelector('.content-warning-main')
        const settingsContainer = parentContainer.querySelector('.enable-warning-btns')
        const contentWarningText = parentContainer.querySelector('.content-warning-text')
        if (isRemoveContentCookie) {
            $(settingsContainer).toggleClass('d-flex, d-none')
            $(contentWarningText).removeClass('d-none')
        } else {
            $(disableSettingsContainer).toggleClass('d-flex, d-none')
            $(contentWarningText).addClass('d-none')
        }
    }

    //return to prev page or home if no prev page
    function handleReturnToDiffPage() {
        const previousPageUrl = document.referrer;
        const currPageUrl = window.location.href
        const isPrevPage = previousPageUrl && previousPageUrl !== currPageUrl
        const url = isPrevPage ? previousPageUrl : 'https://www.floridamemory.com/'
        window.location.href = url;
    }

    //prevent btn from being triggered
    function handleCookieIconClick(event) {
        event.stopPropagation();
    }

    //helper func to reset videos when item hidden
    const resetVideos = () => {
        const contentWarningVids = document.querySelectorAll('video.content-warning-img');
        if (contentWarningVids) {
            contentWarningVids.forEach(video => {
                video.pause();
                video.currentTime = 0;
            })
        }
    }




    //helpers for creating/getting/deleting cookies
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
}

