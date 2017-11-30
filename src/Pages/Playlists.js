import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';

class App extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fetch("http://music.maatwerk.works/api/playlists/")
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

    render() {
        return (
            <div style={{ padding: 20}}>
                <div style={{ padding: 20}}>
                    <Route render={({ history}) => (
                        <Button
                            color="primary"
                            block
                            size="lg"
                            onClick={() => { history.push('/Library') }}>
                            Library
                        </Button>
                    )} />
                </div>
                <div className="list-group">
                    {this.state.items.length ? this.state.items.map(item =>
                        <div className="list-group-item" key={item.id}>
                            <a href={"/Playlists/Playlist/" + item.id} className="list-group-item">
                                <h4 className="list-group-item-heading">{item.name}</h4>
                            </a>
                            <Route render={({ history}) => (
                                <Button
                                    color="primary"
                                    block
                                    size="lg"
                                    onClick={() => { history.push('/Playlists/EditPlaylist/' + item.id) }}>
                                    Edit
                                </Button>
                            )} />
                            <Button
                                color="primary"
                                block
                                size="lg"
                                onClick={() => {
                                    fetch("http://music.maatwerk.works/api/playlists", {
                                        method: 'DELETE',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(item.id)
                                    })
                                     }}>
                                Delete
                            </Button>
                        </div>) : <p> Loading... </p>}
                </div>
                <div style={{ padding: 20}}>
                    <Route render={({ history}) => (
                        <Button
                            color="primary"
                            block
                            size="lg"
                            onClick={() => { history.push('/Playlists/AddPlaylist') }}>
                            Add new playlist
                        </Button>
                    )} />
                </div>
            </div>
        );
  }
}

export default App;
