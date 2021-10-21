'use strict';

(function () {
  var accrodionElements = document.querySelectorAll('.footer__accordion');
  var accordionButtons = document.querySelectorAll('.footer__accordion h3');
  var mobileScreen = window.matchMedia('(max-width: 767px)');

  if (accrodionElements) {
    for (var i = 0; i < accrodionElements.length; i++) {
      accrodionElements[i].classList.remove('footer__accordion--nojs');
    }
  }

  if (accordionButtons) {
    for (var k = 0; k < accordionButtons.length; k++) {
      accordionButtons[k].addEventListener('click', function (evt) {
        evt.preventDefault();
        if (mobileScreen.matches) {
          var array = Array.from(accordionButtons);
          var target = evt.target;
          var index = array.indexOf(target);

          array.forEach(function (item, j) {
            if (j === index) {
              accrodionElements[j].classList.toggle('footer__accordion--active');
            } else {
              accrodionElements[j].classList.remove('footer__accordion--active');
            }
          });
        }
      });
    }
  }
})();

(function () {
  var userPhone = document.querySelector('#user-tel');
  var userName = document.querySelector('#user-name');
  var buttonForm = document.querySelector('.questions__button-wrapper button');

  var im = new Inputmask('+7 (999) 999-99-99');
  if (userPhone) {
    im.mask(userPhone);
  }

  if (buttonForm) {
    buttonForm.addEventListener('click', function (evt) {
      if (userName) {
        if (userName.value.length === 0) {
          evt.preventDefault();
          userName.setCustomValidity('Введите ваше имя');
        } else {
          userName.setCustomValidity('');
        }
        userName.reportValidity();
        localStorage.setItem('name', userName.value);
      }

      if (userPhone) {
        if (userPhone.value.length === 0) {
          evt.preventDefault();
          userPhone.setCustomValidity('Введите номер телефона');
        } else if (userPhone.value.length > 0) {
          var phoneNumber = userPhone.value.split('');
          if (phoneNumber.includes('_')) {
            userPhone.setCustomValidity('Введите номер телефона полностью');
          } else {
            userPhone.setCustomValidity('');
          }
        } else {
          userPhone.setCustomValidity('');
        }
        userPhone.reportValidity();
        localStorage.setItem('phone', userPhone.value);
      }
    });
  }

  userPhone.addEventListener('input', function () {
    userPhone.setCustomValidity('');
  });

  userName.addEventListener('input', function () {
    userName.setCustomValidity('');
  });
})();

(function () {
  var modalButton = document.querySelector('.header__button');
  var modal = document.querySelector('.modal');
  var modalWrapper = document.querySelector('.modal__wrapper');
  var modalSendButton = document.querySelector('.modal__button');
  var modalCloseButton = document.querySelector('.modal__button-close');
  var userName = document.querySelector('#name');
  var userTel = document.querySelector('#tel');
  var modalText = document.querySelector('#modal-text');

  var im = new Inputmask('+7 (999) 999-99-99');
  im.mask(userTel);

  if (modalSendButton) {
    modalSendButton.addEventListener('click', function (evt) {
      if (userName) {
        if (userName.value.length === 0) {
          evt.preventDefault();
          userName.setCustomValidity('Введите ваше имя');
        } else {
          userName.setCustomValidity('');
        }
        userName.reportValidity();
        localStorage.setItem('name', userName.value);
      }

      if (userTel) {
        if (userTel.value.length === 0) {
          evt.preventDefault();
          userTel.setCustomValidity('Введите номер телефона');
        } else if (userTel.value.length > 0) {
          var phoneNumber = userTel.value.split('');
          if (phoneNumber.includes('_')) {
            userTel.setCustomValidity('Введите номер телефона полностью');
          } else {
            userTel.setCustomValidity('');
          }
        } else {
          userTel.setCustomValidity('');
        }
        userTel.reportValidity();
        localStorage.setItem('phone', userTel.value);
      }

      if (modalText) {
        localStorage.setItem('text', modalText.value);
      }
    });
  }

  userTel.addEventListener('input', function () {
    userTel.setCustomValidity('');
  });

  userName.addEventListener('input', function () {
    userName.setCustomValidity('');
  });

  modalButton.addEventListener('click', function () {
    modal.classList.add('modal--opened');
    document.body.classList.add('no-scroll');

    userName.focus();

    localStorage.setItem('name', userName.value);
    localStorage.setItem('tel', userTel.value);
    localStorage.setItem('text', modalText.value);

    modalCloseButton.addEventListener('click', closeModal);

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closeModalHandler();
      }
    });

    modal.addEventListener('click', function (evt) {
      if (evt.target !== modalWrapper) {
        closeModalHandler();
      }
    });

  });

  modalWrapper.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });

  function closeModal() {
    modal.classList.remove('modal--opened');
    document.body.classList.remove('no-scroll');
  }

  function closeModalHandler() {
    closeModal();
    window.removeEventListener('keydown', closeModalHandler);
    modalCloseButton.removeEventListener('click', closeModalHandler);
    modalButton.removeEventListener('click', closeModalHandler);
  }

  function trapFocus(element) {
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    element.addEventListener('keydown', function (e) {
      var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }

  if (modal) {
    trapFocus(modal);
  }

})();