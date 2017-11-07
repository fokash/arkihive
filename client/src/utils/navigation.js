import React from 'react';

let navigation = (routeName, parentProps) => {
    const modalElement = document.getElementsByClassName('modal-open')[0];
    if (modalElement) {
      modalElement.classList.remove('modal-open');
      document.getElementsByClassName('modal-backdrop')[0].remove();
      document.querySelector('.modal.in').removeAttribute('style');
      document.querySelector('.modal.in').classList.remove('in');
    }
    parentProps.push({
      pathname: routeName
    });
  };

  export default navigation;