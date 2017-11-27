import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter} from 'react-router-dom'

import Playlists from "./Pages/Playlists.js";
import Library from "./Pages/Library.js";
import Playlist from "./Pages/Playlist.js";
import Login from "./Pages/Login.js";
import AddPlaylist from "./Pages/AddPlaylist.js";
import EditPlaylist from "./Pages/EditPlaylist.js";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/Playlists" component={Playlists} />
                <Route exact path="/Library" component={Library} />
                <Route exact path="/Login" component={Login} />
                <Route path="/Playlists/Playlist/:id" component={Playlist} />
                <Route path="/Playlists/AddPlaylist" component={AddPlaylist} />
                <Route path="/Playlists/EditPlaylist/:id" component={EditPlaylist} />
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
