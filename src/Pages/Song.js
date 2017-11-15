import React, { Component } from 'react';
import { Button, Form, FormText, FormGroup, Alert } from 'reactstrap';
import TextFieldGroup from '../Pages/TextFieldGroup';
import { Route } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            name: '',
            album: '',
            artist: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        fetch("http://music.maatwerk.works/api/Songs/" + this.props.match.params.id)
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

        /*this.delete(this.state.id);
        const data = new FormData();
        data.append('id', this.state.items.id)
        data.append('userId', this.state.items.userId)
        data.append('name', this.state.name);
        data.append('album', this.state.album);
        data.append('artist', this.state.artist);
        data.append('createdAt', this.state.items.createdAt);
        data.append('updatedAt', this.state.items.updatedAt);*/

        this.state.items.name = this.state.name;
        this.state.items.album = this.state.album;
        this.state.items.artist = this.state.artist;

        fetch("http://music.maatwerk.works/api/songs", {
            method: 'PUT',
            //body: data
            body: this.state.items
        })
            .then((result) => result.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {name, album, artist} = this.state;
        return (
            <div style={{ padding: 20}}>
                <Form onSubmit={this.onSubmit}>
                    <h1>Song edit</h1>
                    <TextFieldGroup
                        field="name"
                        value={name}
                        label="Name"
                        placeholder={this.state.items.name}
                        onChange={this.onChange}/>
                    <TextFieldGroup
                        field="album"
                        value={album}
                        label="Album"
                        placeholder={this.state.items.album}
                        onChange={this.onChange}/>
                    <TextFieldGroup
                        field="artist"
                        value={artist}
                        label="Artist"
                        placeholder={this.state.items.artist}
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
                        onClick={() => { history.push('/library') }}>
                        Back
                    </Button>
                )} />
            </div>
        );
    }
}

export default App;
