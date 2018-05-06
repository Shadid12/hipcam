import React from 'react';
import Webcam from 'react-webcam';
import RaisedButton from 'material-ui/RaisedButton'

export default class CameraContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            img: ''
        }
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }
     
    capture = () => {
        const img = this.webcam.getScreenshot();
        this.setState({ img: img })
    };

    reset = () => {
        this.setState({img: ''});
    }

    analyze = () => {
        console.log(this.state.img);
    }

    render() {
        const camera_state = !this.state.img ? (
            [
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                />,
                <RaisedButton 
                    label="Snap a Selfie" 
                    fullWidth={true} 
                    primary={true}
                    onClick={this.capture}
                />
            ]
        ) : (
            [
                <img src={this.state.img} />,
                <RaisedButton 
                        label="Take Another Pic" 
                        fullWidth={true} 
                        primary={true}
                        onClick={this.reset}
                />,
                <br />,
                <RaisedButton 
                        label="Analyze" 
                        fullWidth={true} 
                        primary={true}
                        onClick={this.analyze}
                />
            ]
        )
        return(
            <div>
                {camera_state}
            </div>
        )
    }
}