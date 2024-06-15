$(document).ready(function () {

    $('.custom-dropdown select').on('change', function () {
        var selectedOption = $(this).find(':selected');
        var iconOption = selectedOption.hasClass('icon-option');

        if (iconOption) {
            $('.custom-dropdown .arrow i').text(selectedOption.text());
        } else {
            $('.custom-dropdown .arrow i').text('arrow_drop_down');
        }

    });

});


