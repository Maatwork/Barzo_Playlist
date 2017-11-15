import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class App extends Component {
    constructor() {
        super();
        this.state={items:[]}
        this.cellEditProp = {
            mode: 'click'
        };
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
                        </a>): <p> Loading... </p>}
                </div>
                <BootstrapTable className="test" data={this.state.items} keyField="id" search keyBoardNav cellEdit={ this.cellEditProp }>
                    <TableHeaderColumn dataField="id" hidden={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="album">Album</TableHeaderColumn>
                    <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default App;