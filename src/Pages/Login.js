import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }


    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <form className="form-horizontal" action='http://localhost:3001/login' method='post'>
                <h1>Login to continue </h1>
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Username</label>
                    <div className="input-group">
                        <span className="input-group-addon"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} name="username"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Password</label>
                    <div className="input-group">
                        <span className="input-group-addon"><i class="glyphicon glyphicon-header" aria-hidden="true"></i></span>
                        <input type="text" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} name="password"/>
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        <input type="submit" className="form-control" value="Login"/>
                    </label>
                </div>
            </form>
        );
    }
}
