import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';

class App extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fetch("http://music.maatwerk.works/api/songs/")
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
            <div>
                <div class="row">
                    <div className="col-md-offset-9">
                        <a href="/Playlists" className="btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-th-list"></span> Playlists
                        </a>
                    </div>
                </div>
                <div className="list-group">
                    {this.state.items.length ? this.state.items.map(item =>
                        <a href={"/Library/Song/" + item.id} className="list-group-item" key={item.id}>
                            <h4 className="list-group-item-heading">{item.name} -- {item.album} -- {item.artist}</h4>
                            <a href={"/Library/Song/Delete/" + item.id} className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-th-list"></span> Delete
                            </a>
                        </a>): <p> Loading... </p>}
                </div>
            </div>
        );
    }
}

export default App;