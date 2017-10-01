import React from 'react';

const ModalLoginContent = () => (
    <div>
        <button type="button" className="btn btn-primary btn-facebook">FACEBOOK</button>
        <p>OR</p>
        <button type="button" className="btn btn-primary btn-google">GOOGLE+</button>
        <p>OR</p>
        <form>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Email" name="email" id="email" />
                <input type="password" className="form-control" placeholder="Password" name="password" id="password" />
                <button type="button" className="btn btn-primary">Login</button>
                <div className="login-options">
                    <span><a href="#">Forgot Password?</a></span>
                    <span><a href="#registerModal" data-toggle="modal" data-dismiss="modal">New User?</a></span>
                </div>
            </div>
        </form>
    </div>
);

export default ModalLoginContent;