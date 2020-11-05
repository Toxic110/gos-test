import $ from 'jquery';
import 'inputmask/dist/inputmask/jquery.inputmask';
import 'jquery-validation';
import 'jquery-validation/dist/additional-methods';
import {bind_phone_mask, validate_phone} from '../vendor/phonemask.js';
import {bind_fio_mask} from '../vendor/fiomask.js';

$.fn.mask = $.fn.inputmask;
bind_phone_mask('form input[name="phone"]');
bind_fio_mask('form .js-input-fio');

$.validator.addMethod('phoneNumber', function (value, element) {
  return validate_phone(value);
}, 'Введите существующий номер.');

$.validator.addMethod('emailField', function (value, element) {
  return isTrueEmail(value);
}, 'Введите существующий email.');

$.fn.clearValidation = function () {
  const v = $(this).validate();
  $('[name]', this).each(function () {
    v.successList.push(this);
    v.showErrors();
  });
  v.resetForm();
  v.reset();
};

export const isEmail = function (email) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

 export const isTrueEmail = function (email) {
  const pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return $.trim(email).match(pattern) ? true : false;
};
