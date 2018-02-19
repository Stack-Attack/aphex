import React, {Component} from 'react';
import Sticky from 'react-stickynode';
import './ItemInfo.css';
import PlayButton from './Controls/PlayButton';


class ItemInfo extends Component {

    render() {

        let title = '';
        let fileName = '';
        let id = '';

        if (this.props.data) {
            title = this.props.data.title;
            fileName = this.props.data.file;
            id = this.props.data.id;
        }

        return (
            <Sticky>
                <div className={'item-info' + (!this.props.data ? ' hidden' : '')}>
                    <div className={(!this.props.displayControls ? 'hidden' : '')}>
                        <PlayButton onClick={() => this.props.onToggle(this.props.data)} playing={this.props.playing}/>
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