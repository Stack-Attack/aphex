import React, {Component} from 'react';

class ItemInfo extends Component {

    render() {

        let title = '';
        let fileName = '';

        if(this.props.data){
            title = this.props.data.title;
            fileName = this.props.data.file;

        }

        return (
            <div>
                <h1>
                    {title}
                </h1>
                <p>
                    Some info will go here. A visualization
                </p>
                <p>
                    {fileName}
                </p>
            </div>
        );
    }

}

export default ItemInfo;