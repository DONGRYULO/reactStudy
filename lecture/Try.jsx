import React, {PureComponent} from 'react';

class Try extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            result : this.props.result,
            try: this.props.try
        };
    }

    render(){
        const {try : t, result: r} = this.props.tryInfo;
        return (
            <li>
                <div>{t}</div>
                <div>{r}</div>
            </li>
        );
    }
}

export default Try;