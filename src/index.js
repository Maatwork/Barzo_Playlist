import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter} from 'react-router-dom'

import Playlists from "./Pages/Playlists.js";
import Library from "./Pages/Library.js";
import Playlist from "./Pages/Playlist.js";
import Song from "./Pages/Song.js";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/Playlists" component={Playlists} />
                <Route exact path="/Library" component={Library} />
                <Route path="/Playlists/Playlist/:id" component={Playlist} />
                <Route path="/Library/Song/:id" component={Song} />
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
