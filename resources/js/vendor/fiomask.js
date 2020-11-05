import $ from 'jquery';

export function bind_fio_mask(inputEl, regexMask = /[^a-zA-Zа-яА-ЯёЁ \-]/g) {
  $(inputEl).on('input', function(){
    const regexp = regexMask;
    if($(this).val().match(regexp)){
      $(this).val( $(this).val().replace(regexp,'') );
    }
  });
}
