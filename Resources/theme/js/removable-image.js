/**
 * Created by bartwesselink on 4/28/16.
 *
 * Creates a wrapper, including the preview image, and enables user to remove it
 */
$(document).ready(function() {
    $('.removable-image-upload').each(function() {
        var path = $(this).attr('data-path');

        if(path != '' && path != '/' && path != '/initial') {
            var wrapper = $('<div class="uploaded-image-container"></div>');

            var image = $('<img width="85" src="">');
            image.attr('src', path);
            wrapper.append(image);

            var button = $('<i class="fa fa-remove remove-uploaded-image"></i>');
            wrapper.append(button);
            button.click(function() {
                $(this).parent().parent().find('.removable-image-upload').attr('data-path', '');
                $(this).parent().parent().find('.remove-image-hidden-field').val('true');
                $(this).parent().remove();
            });

            $(this).after(wrapper);
        }

        $(this).change(function() {
            $(this).attr('data-path', '');
            $(this).parent().find('.remove-image-hidden-field').val('false');
            $(this).parent().find('.uploaded-image-container').remove();
        })
    });
});