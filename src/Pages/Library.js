import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import { Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Route } from 'react-router-dom';

class App extends Component {
    constructor() {
        super();
        this.state={items:[]}
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
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
            body: row
        })
            .then((result) => result.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
        console.log(row);
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