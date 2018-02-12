import React, {Component} from 'react';
import Sticky from 'react-stickynode';
import './ItemInfo.css';


class ItemInfo extends Component {

    render() {

        let title = '';
        let fileName = '';

        if (this.props.data) {
            title = this.props.data.title;
            fileName = this.props.data.file;

        }

        return (
            <Sticky>
                <div className={'item-info' + (!this.props.data ? ' hidden' : '')}>
                    <div className={(!this.props.displayControls ? 'hidden' : '')}>
                        <strong>controls here</strong>
                    </div>

                    <h1>
                        {title}
                    </h1>

                    <p>
                        {fileName}
                    </p>
                </div>
            </Sticky>
        );
    }

}

export default ItemInfo;