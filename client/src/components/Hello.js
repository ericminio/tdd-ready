import React, { Component } from 'react';

class Hello extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            greetings: ''
        };
        this.fetchMessage = this.fetchMessage.bind(this);
    }

    componentDidMount() {
        this.fetchMessage()
            .then(res => this.setState({ greetings: res.message.content }))
            .catch(error => { this.setState({ error:error }) });
    }

    fetchMessage = async () => {
        const response = await fetch('/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.error);

        return body;
    };

    render() {
        return (
            <div>
                <div id="greetings">{ this.state.greetings }</div>
                <div id="error">{ this.state.error }</div>
            </div>
        )
    }

} export default Hello;
