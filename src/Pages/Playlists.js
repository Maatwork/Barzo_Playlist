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
                        <a href={"/Playlists/Playlist/" + item.id} className="list-group-item" key={item.id}>
                            <h4 className="list-group-item-heading">{item.name}</h4>
                            <a href={"/Playlists/Playlist/Edit/" + item.id} className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-th-list"></span> Edit
                            </a>
                            <a href={"/Playlists/Playlist/Delete/" + item.id} className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-th-list"></span> Delete
                            </a>
                        </a>): <p> Loading... </p>}
                </div>
                <div class="row">
                    <div className="col-md-offset-9">
                        <a href="/Playlists/Playlist/Add" className="btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-th-list"></span> Add New Playlist
                        </a>
                    </div>
                </div>
            </div>
        );
  }
}

export default App;
