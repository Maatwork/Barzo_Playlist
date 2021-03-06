import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import TextFieldGroup from '../Pages/TextFieldGroup';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state.name));
        fetch("http://music.maatwerk.works/api/playlists", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: this.state.name})
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {name} = this.state;
        return (
            <div style={{ padding: 20}}>
                <Form onSubmit={this.onSubmit}>
                    <h1>New playlist</h1>
                    <TextFieldGroup
                        field="name"
                        value={name}
                        label="Name"
                        onChange={this.onChange}/>
                    <Button
                        color="primary"
                        block
                        size="lg">
                        Submit
                    </Button>
                </Form>
                <div><p></p></div>
                <Route render={({ history}) => (
                    <Button
                        color="primary"
                        block
                        size="lg"
                        onClick={() => { history.push('/Playlists') }}>
                        Back
                    </Button>
                )} />
            </div>
        );
    }
}

export default App;
