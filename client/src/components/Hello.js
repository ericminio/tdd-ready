import React, { Component } from 'react';
import {
    fetchMessage
} from '../services';

class Hello extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            greetings: ''
        };
        this.fetchMessage = props.fetchMessage? props.fetchMessage: fetchMessage.default;
    }

    componentDidMount() {
        this.fetchMessage()
            .then(res => this.setState({ greetings: res.message.content }))
            .catch(error => { this.setState({ error:error }) });
    }

    render() {
        return (
            <div>
                <div id="greetings">{ this.state.greetings }</div>
                <div id="error">{ this.state.error }</div>
            </div>
        )
    }

} export default Hello;
