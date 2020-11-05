import $ from "jquery";

$(document).ready(() => {

  $('.js-btn-nex').on('click', function(){
    let form = $('.form-applicant');
    form.validate({
      submitHandler: function(form) {
        let $form = $(form);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize()
        })
          .done(function() {
            try {
              $('.steps-form__block').hide();
              $('.steps-form__success').css('display', 'flex');
            } catch (c) {}
          })
          .fail(function() {
            console.log('fail');
          });
      },
      rules: {
        surname: 'required',
        youname: 'required',
        patronymic: 'required',
        email: {
          emailField: true
        },
        phone: {
          phoneNumber: true
        },
        passportSeries: {
          required: function(){
            return $('.js-document-select').val() === '1';
          },
          minlength: 4
        },
        passportNumber: {
          required: function(){
            return $('.js-document-select').val() === '1';
          },
          minlength: 6
        },
        passportDay: {
          required: function(){
            return $('.js-document-select').val() === '1';
          }
        },
        passportMonth: {
          required: function(){
            return $('.js-document-select').val() === '1';
          }
        },
        passportYear: {
          required: function(){
            return $('.js-document-select').val() === '1';
          },
          minlength: 4
        },
        driveNumber: {
          required: function(){
            return $('.js-document-select').val() === '2';
          },
          minlength: 10
        },
        driveChapter: {
          required: function(){
            return $('.js-document-select').val() === '2';
          },
          minlength: 4
        }
      },
      messages: {
        surname: '',
        youname: '',
        patronymic: '',
        email: '',
        phone: '',
        passportSeries: '',
        passportNumber: '',
        passportDay: '',
        passportMonth: '',
        passportYear: '',
        driveNumber: '',
        driveChapter: ''
      }
    });
    if (form.valid() === true) {
      let currentStep = $(this).closest('.steps-form__block');
      let nextStep = $(this).closest('.steps-form__block').next();
      nextStep.removeClass('steps-form__block--disabled steps-form__block--success');
      currentStep.addClass('steps-form__block--success');
    }
  });


  $( '.js-checkbox-form').on( 'click', function() {
    if($('.js-checkbox-form:checked').length > 1) {
      $('.js-btn-form').prop('disabled', false);
    } else {
      $('.js-btn-form').prop('disabled', true);
    }
  });

  $('.js-edit-step-one').on('click', function () {
    $('.steps-form__block').addClass('steps-form__block--disabled');
    $(this).closest('.steps-form__block').removeClass('steps-form__block--disabled steps-form__block--success');
  });

  $('.js-edit-step-two').on('click', function () {
    $('.step-form__block--three').addClass('steps-form__block--disabled');
    $(this).closest('.steps-form__block').removeClass('steps-form__block--success');
  });
});