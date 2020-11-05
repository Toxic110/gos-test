import $ from 'jquery';
import 'jquery-mask-plugin';

$(document).ready(() => {
  $('.js-passport-series').mask('0000');
  $('.js-passport-number').mask('000000');
  $('.js-passport-day').mask('00');
  $('.js-passport-month').mask('00');
  $('.js-passport-year').mask('0000');
  $('.js-drive-number').mask('0000000000');
  $('.js-drive-chapter').mask('0000');
});