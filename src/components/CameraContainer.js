import React from 'react';
import Webcam from 'react-webcam';

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

    render() {
        return(
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                />
                <button onClick={this.capture}>Capture photo</button>
                <img src={this.state.img} />>
            </div>
        )
    }
}