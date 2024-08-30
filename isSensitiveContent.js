const sensitiveImages = document.querySelectorAll('.content-warning-img')



if (sensitiveImages) {
    $(function () {
        // Initialize popovers
        $('[data-toggle="popover"]').popover({
            trigger: 'hover', // Show popover on hover
            html: true // Allow HTML content
        });
    });

    sensitiveImages.forEach(image => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('content-warning-container')
        image.parentNode.insertBefore(divContainer, image);

        const sensitiveContentContainer = document.createElement('div')
        sensitiveContentContainer.classList.add('sensitive-content-container')
        sensitiveContentContainer.innerHTML = `
        <div class="sensitive-content-container">
            <div class="content-warning-label">
                <p>Show content:</p>
            </div>
            <div class="content-warning-btns">
            <button onclick="handleImgSettingsClick(event)" class="btn btn-primary w-100 rounded-0 show-content-btn show-once-btn" data-toggle="popover" data-placement="top"  data-content="Temporarily show this image">
                <i class="fa fa-eye"></i> Once
            </button>
            <button onclick="handleImgSettingsClick(event)" class="btn btn-success w-100 rounded-0 show-content-btn show-always-btn" data-toggle="popover" data-placement="top"  data-content="Update settings to always show sensitive content">
                <i class="fa fa-eye"></i> Always
            </button>
            <button onclick="handleImgSettingsClick(event)" class="btn btn-danger w-100 rounded-0 show-content-btn show-never-btn" data-toggle="popover" data-placement="top"  data-content="Update settings to always hide sensitive content">
                <i class="fa fa-eye-slash"></i> Never
            </button>
        </div>
            </div>
        </div>


        `
        divContainer.append(image, sensitiveContentContainer);
    })

    function handleImgSettingsClick(event) {
      const item = event.target;
        if(item.classList.contains('show-once-btn')){
            console.log('show once btn')
        } else if(item.classList.contains('show-always-btn')){
            console.log('show always btn')
        } else {
            console.log('show never btn')

        }
    }

}