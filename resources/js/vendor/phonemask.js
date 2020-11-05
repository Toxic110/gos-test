import $ from 'jquery';
import 'inputmask/dist/inputmask/jquery.inputmask';

export function bind_phone_mask(inputEl, regexMask, placeholder) {
  if (regexMask == null) {
    regexMask = '^\\+7 \\([3489]\\d\\d\\) \\d\\d\\d \\d\\d \\d\\d$';
  }
  if (placeholder == null) {
    placeholder = '+7 (___) ___ __ __';
  }
  const $input = $(inputEl);
  $input.inputmask({
    regex: regexMask,
    placeholder: placeholder,
    postValidation: function (buffer, pos, currentResult, opts) {
      const nums = buffer.join('').replace(/[^0-9]+/g, '');
      const hasSevenNumbersInARow = (/(\d)\1{6}/g).test(nums);
      return !hasSevenNumbersInARow;
    }
  });
  $input.on('input', function (event) {
    const val = $(this).val();
    if (val.replace(/[^0-9]+/g, '') === '789') {
      $(this).val('79');
    }
  });
}

export function validate_phone(value, regex) {
  if (value == null) {
    value = '';
  }
  if (regex == null) {
    regex = /^\+7 \([3489]\d\d\) \d\d\d \d\d \d\d$/g;
  }
  const nums = value.replace(/[^0-9]+/g, '');
  return regex.test(value) && !(/(\d)\1{6}/g).test(nums);
}
