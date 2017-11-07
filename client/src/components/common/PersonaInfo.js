import React, {Component} from 'react';

export class PersonaInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div className="persona-photo">
                <img width="42" className="img-circle" src={'http://localhost:4000/images/' + this.props.imageLocation} />
                <p>
                    <span className="persona-name">{this.props.personaName}</span>
                    <span className="persona-role">{this.props.personaRole}</span>
                </p>
            </div>
        );
    }
}
 
export default PersonaInfo;