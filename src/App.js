import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CameraContainer from './components/CameraContainer';

export default class App extends React.Component {
    render() {
        return(
            <MuiThemeProvider>
                <div>
                    <CameraContainer />
                </div>
            </MuiThemeProvider>
        )
    }
}