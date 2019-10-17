import React from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import image2base64 from 'image-to-base64';
import { saveNewAvatar } from '../../store/chat';
import { connect } from 'react-redux';

class MyAvatarEditor extends React.Component {
  state = {
    image: '',
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 200,
    height: 200
  };

  async componentDidMount() {
    const { image } = this.props;
    const base64 = await this.toBase64(image);
    this.setState({
      image: base64
    });
  }

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  toBase64 = async image => {
    let img;
    if (!image.includes('data:image')) {
      await image2base64(image)
        .then(response => {
          img = 'data:image/jpeg;base64,' + response;
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    } else {
      img = image;
    }
    return img;
  };

  handlePreview = data => {
    console.log(data);
    const { scale, width, height, borderRadius } = this.state;

    if (!this.ref) return null;
    const img = this.ref.getImageScaledToCanvas().toDataURL();
    const rect = this.ref.getCroppingRect();

    const preview = {
      img,
      rect,
      scale,
      width,
      height,
      borderRadius
    };

    this.setState({ preview });
    this.props.saveNewAvatar(preview);
  };

  handleSaveImage = () => {
    const { preview } = this.state;
    this.props.saveNewAvatar(preview);
  };

  handleScale = e => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  rotateLeft = e => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate - 90
    });
  };

  rotateRight = e => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90
    });
  };

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value);
    this.setState({ borderRadius });
  };

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] });
  };

  render() {
    const { scale, rotate, width, borderRadius, image, preview } = this.state;

    return (
      <React.Fragment>
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          multiple={false}
          // style={{ width: this.state.width, height: this.state.height, marginBottom: '35px' }}
        >
          {({ getRootProps, getInputProps }) => {
            console.log('getRootProps', getRootProps);
            console.log('getInputProps', getInputProps);

            return (
              <React.Fragment>
                <div {...getRootProps()}>
                  <ReactAvatarEditor
                    ref={ref => (this.ref = ref)}
                    scale={parseFloat(scale)}
                    width={100}
                    height={100}
                    rotate={parseFloat(rotate)}
                    borderRadius={width / (100 / borderRadius)}
                    image={image}
                    className="editor-canvas"
                  />
                  <input type="file" onChange={this.handleNewImage} />
                </div>
              </React.Fragment>
            );
          }}
        </Dropzone>
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={'0.1'}
          max="4"
          step="0.01"
          defaultValue="1"
        />
        Border radius:
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="100"
          step="1"
          defaultValue="0"
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft}>Left</button>
        <button onClick={this.rotateRight}>Right</button>
        <br />
        <input type="button" onClick={this.handlePreview} value="Preview" />
        <br />
        {!!preview && (
          <img
            src={preview.img}
            alt="preview"
            style={{
              borderRadius: `${(Math.min(preview.height, preview.width) + 10) *
                (preview.borderRadius / 2 / 100)}px`
            }}
          />
        )}
        <button onClick={this.handleSaveImage}>Save</button>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => dispatch => ({
  saveNewAvatar: image => dispatch(saveNewAvatar(image))
});

export default connect(
  null,
  mapDispatchToProps
)(MyAvatarEditor);
