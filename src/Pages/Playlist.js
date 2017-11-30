import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class App extends Component {
    constructor() {
        super();
        this.state={
            playlist:[],
            toAdd:[],
            toRemove:[],
            library:[]
        };
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
            bgColor: function(row, isSelect) {
                if (isSelect) {
                    const { id } = row;
                    return 'yellow';
                }
                return null;
            }
        };
    }

    componentDidMount(){
        fetch("http://music.maatwerk.works/api/playlists/" + this.props.match.params.id + "/songs")
            .then(res => {
                console.log(res);
                res.json().then((data) => {
                    console.log(data);
                    this.setState({ playlist: data });
                });
            })
            .catch((error) => {
                console.error(error);
            });
        fetch("http://music.maatwerk.works/api/songs/")
            .then(res => {
                console.log(res);
                res.json().then((data) => {
                    console.log(data);
                    this.setState({ library: data });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onRowSelect(row, isSelected, e) {
        e.preventDefault();
        if (isSelected == true)
        {
            this.state.toAdd[this.state.toAdd.length] = row.id;
        }
        else
        {
            this.state.toAdd[this.state.toAdd.indexOf(row.id)] = null;
        }
    }

    onAdd(e) {
        e.preventDefault();
        fetch("http://music.maatwerk.works/api/playlists/" + this.props.match.params.id + "/songs", {
            method: 'POST',
                headers: {
                'Accept': 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.toAdd)
        });
    }

    onRemove(e) {
        e.preventDefault();
        fetch("http://music.maatwerk.works/api/playlists/" + this.props.match.params.id + "/songs", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.toRemove)
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
                            onClick={() => { history.push('/Playlists') }}>
                            Back
                        </Button>
                    )} />
                </div>
                <div><h3>Playlist:</h3></div>
                <BootstrapTable className="test" data={this.state.playlist} keyField="id" search keyBoardNav selectRow={ this.selectRowProp }>
                    <TableHeaderColumn dataField="id" hidden={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="album">Album</TableHeaderColumn>
                    <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
                </BootstrapTable>
                <div style={{ padding: 20}}>
                    <Button
                        color="primary"
                        block
                        size="lg"
                        onClick={this.onRemove}>
                        Remove selected songs
                    </Button>
                </div>
                <div><h3>Library:</h3></div>
                <BootstrapTable className="test" data={this.state.library} keyField="id" search keyBoardNav selectRow={ this.selectRowProp }>
                    <TableHeaderColumn dataField="id" hidden={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="album">Album</TableHeaderColumn>
                    <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
                </BootstrapTable>
                <div style={{ padding: 20}}>
                    <Button
                        color="primary"
                        block
                        size="lg"
                        onClick={this.onAdd}>
                        Add selected songs
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
