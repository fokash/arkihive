import React from 'react';

let navigation = (routeName, parentProps) => {
    const modalElement = document.getElementsByClassName('modal-open')[0];
    if (modalElement) {
      modalElement.classList.remove('modal-open');
      document.getElementsByClassName('modal-backdrop')[0].remove();
    }
    parentProps.history.push({
      pathname: routeName
    });
  };

  export default navigation;