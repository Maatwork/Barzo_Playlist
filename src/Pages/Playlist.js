import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';

class App extends Component {

    render() {
        return (
            <div>
                <div class="row">
                    <div className="col-md-offset-9">
                        <a href="/Playlists" className="btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-th-list"></span> Back
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
