import React from 'react';

class TRow extends React.Component {    
    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.name}</td>
                <td>{this.props.profiles}</td>
                <td>{this.props.followers}</td>
                <td>{this.props.engagement}</td>
            </tr>
        )
    }
}

export default TRow;