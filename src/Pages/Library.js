import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import { Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Route } from 'react-router-dom';

class App extends Component {
    constructor() {
        super();
        this.state={
            items:[],
            toRemove:[]
        }
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
            bgColor: function (row, isSelect) {
                if (isSelect) {
                    const {id} = row;
                    return 'yellow';
                }
                return null;
            }
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

    onAfterSaveCell(row, cellName, cellValue) {
        fetch("http://music.maatwerk.works/api/songs/" + row.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(row)
        })
    }

    onRowSelect(row, isSelected, e) {
        e.preventDefault();
        if (isSelected == true) {
            this.state.toRemove[this.state.toRemove.length] = row.id;
        }
        else {
            this.state.toRemove[this.state.toRemove.indexOf(row.id)] = null;
        }
    }

    onRemove(e)
    {
        e.preventDefault();
        let tasks = [];

        console.log(this.state.toRemove);
        this.state.toRemove.forEach(id => tasks.push(
            fetch("http://music.maatwerk.works/api/songs/" + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        ));

        Promise.all(tasks)
            .then(() => window.location.reload())
            .catch(error => alert(error));
    }

    onRemove(e) {
        e.preventDefault();
        let tasks = [];

        console.log(this.state.toRemove);
        this.state.toRemove.forEach(id => {
            tasks.push(
                fetch("http://music.maatwerk.works/api/songs/" + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
            )
            Promise.all(tasks)
                .then(() => window.location.reload())
                .catch(error => alert(error));
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
                            Playlists
                        </Button>
                    )} />
                </div>
                <BootstrapTable className="test" data={this.state.items} keyField="id" search keyBoardNav cellEdit={ this.cellEditProp } selectRow={this.selectRowProp}>
                    <TableHeaderColumn dataField="id" hidden={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="album">Album</TableHeaderColumn>
                    <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
                </BootstrapTable>
                <div style={{padding: 20}}>
                    <Button
                        color="primary"
                        block
                        size="lg"
                        onClick={this.onRemove}>
                        Remove selected songs
                    </Button>
                </div>
            </div>
        );
    }
}


export default App;