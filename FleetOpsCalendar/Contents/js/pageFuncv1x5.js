///// <reference path="../../Scripts/jquery-1.9.0.intellisense.js" />
//$(function () {
//    $.ajaxSetup({
//        timeout: 500000,
//        error: function (xhr, status, text) {
//            $.pnotify_remove_all();
//            if ($('#btnMasterSave').length) {
//                if ($('#btnMasterSave').attr('disabled')) {
//                    $('#btnMasterSave').removeAttr('disabled')
//                }
//            }
//            if (xhr.status == 500) {
//                $.pnotify({ text: "We're sorry, but this task have been encountered an error.You wont be able to continue this task while the errors last. The development team has already been notified of the issue.", type: 'error', icon: false });
//            } else if (xhr.status == 404) {
//                $.pnotify({ text: "The resource that you requested have been removed or relocated. Please contact the administrator.", type: 'error', icon: false });
//            } else if (xhr.status == 403) {
//                $('#WebcsLoginId').html("<strong>?</strong>");
//                $.pnotify({
//                    icon: false,
//                    width: 'auto',
//                    hide: false,
//                    closer: false,
//                    sticker: false,
//                    insert_brs: false,
//                    text: xhr.responseText
//                });
//            } else {
//                $.pnotify({ text: "We're sorry, but this action have been encountered an error.You wont be able to continue this task while the errors last. The development team has already been notified of the issue.", type: 'error', icon: false });
//            }
//        }
//    });
//});


//DataUtilities.prototype.displayLoaderMessage = function () {
//    var notice = $.pnotify({
//        text: '<i class="icon-time icon-white" style="margin-right:4px"></i>' + "Please wait...",
//        type: 'info',
//        icon: 'picon picon-throbber',
//        hide: false,
//        closer: false,
//        sticker: false,
//        shadow: false
//    });
//    return notice;
//};
//DataUtilities.prototype.displayFinalStatusMessage = function (notify, model) {
//    var content = { icon: false, hide: true, closer: true };
//    if (model.flag == 0) {
//        content.type = 'success';
//        content.text = '<i class="icon-ok-sign icon-white" style="margin-right:4px"></i>' + model.desp;
//    } else {
//        content.type = 'error';
//        content.text = '<i class="icon-ban-circle icon-white" style="margin-right:4px"></i>' + model.desp;
//        content.animation = { effect_in: 'pulsate', effect_out: 'pulsate' }
//    }
//    return notify.pnotify(content);
//};


