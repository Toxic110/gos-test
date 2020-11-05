import $ from 'jquery';

$(document).ready(() => {
  const documentSelect = $('.js-document-select');
  const documentPassport = $('.js-document-passport');
  const documentDrive = $('.js-document-drive');

  documentSelect.on('change', function() {
    if($(this).val() === '1') {
      documentDrive.hide();
      documentPassport.show();
    }

    if($(this).val() === '2') {
      documentDrive.show();
      documentPassport.hide();
    }
  });

});