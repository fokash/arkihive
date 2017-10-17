import React from 'react';

const ModalRegisterContent = () => (
    <div>
        <form>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" name="name" id="name" />
                <input type="text" className="form-control" placeholder="Email" name="email" id="email" />
                <input type="password" className="form-control" placeholder="Password" name="password" id="password" />
                <input type="password" className="form-control" placeholder="Retype Password" name="retypePassword" id="retypePassword" />
                <label><input type="checkbox" value="" />I agree to Arkihive Terms of Service and Privacy Policy</label>
                <button type="button" className="btn btn-primary">Register</button>
            </div>
        </form>
    </div>
);
 
export default ModalRegisterContent;