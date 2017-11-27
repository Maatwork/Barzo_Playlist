import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import TextFieldGroup from '../Pages/TextFieldGroup';
import { Route } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            name: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        fetch("http://music.maatwerk.works/api/playlists/" + this.props.match.params.id)
            .then(res => {
                console.log(res);
                res.json().then((data) => {
                    console.log(data);
                    this.setState({ items: data });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('id', this.state.items.id)
        data.append('name', this.state.name)

        fetch("http://music.maatwerk.works/api/playlists", {
            method: 'PUT',
            body: data
        })
            .then((result) => result.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {name} = this.state;
        return (
            <div style={{ padding: 20}}>
                <Form onSubmit={this.onSubmit}>
                    <h1>Edit playlist</h1>
                    <TextFieldGroup
                        field="name"
                        value={name}
                        label="Name"
                        placeholder={this.state.items.name}
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
