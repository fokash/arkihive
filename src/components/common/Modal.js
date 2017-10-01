import React from 'react';

const Modal = (props) => (
    <div className="modal fade" id={props.id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                </div>
                <div className="modal-body">
                    <h4 className="modal-title">{props.title}</h4>
                    {props.children}
                </div>
            </div>
        </div>
    </div>
);
 
export default Modal;