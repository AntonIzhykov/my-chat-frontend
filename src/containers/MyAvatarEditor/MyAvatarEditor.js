import React from 'react';
import { connect } from 'react-redux';
import ReactAvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { saveNewAvatar, handleLoadingTempImage } from '../../store/chat';
import { getBase64FromFile, getBase64FromUrl } from '../../helpers';

class MyAvatarEditor extends React.Component {
  state = {
    image: '',
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    width: 200,
    height: 200,
    newAvatar: null,
    isEditing: false
  };

  componentDidMount() {
    const { image } = this.props;
    this.setImageInBase64(image);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.image !== this.props.image) {
      this.setImageInBase64(this.props.image);
      this.setState({
        rotate: 0,
        borderRadius: 0,
        scale: 1,
        width: 200,
        height: 200
      });
    }
  }

  setImageInBase64 = async image => {
    let base64;
    if (image instanceof File) {
      await getBase64FromFile(image, result => {
        this.createNewAvatar(result);
        this.setState({
          image: result
        });
      });
    } else if (typeof image === 'string') {
      base64 = await getBase64FromUrl(image);
      this.createNewAvatar(base64);
      this.setState({
        image: base64
      });
    }
  };

  createNewAvatar = image => {
    if (!this.ref) return null;
    const { scale, width, height, borderRadius } = this.state;
    const img = image ? image : this.ref.getImageScaledToCanvas().toDataURL();
    const newAvatar = {
      img,
      scale,
      width,
      height,
      borderRadius
    };
    this.setState({ newAvatar });
    this.props.saveNewAvatar(newAvatar);
  };

  handleChangeTempImage = e => {
    this.setState({
      tempImage: e.target.value
    });
  };

  handleLoadTempImage = () => {
    const { tempImage } = this.state;
    !!tempImage && this.props.handleLoadingTempImage(tempImage, this.setImageInBase64);
    this.setState({
      tempImage: ''
    });
  };

  handleSaveImage = () => {
    this.createNewAvatar();
    this.setState({
      isEditing: false
    });
  };

  handleScale = e => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  handleRotate = left => () => {
    const rotateAngle = left ? -90 : +90;
    this.setState({
      rotate: this.state.rotate + rotateAngle
    });
  };

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value);
    this.setState({ borderRadius });
  };

  render() {
    const {
      scale,
      rotate,
      width,
      height,
      borderRadius,
      image,
      tempImage = '',
      isEditing
    } = this.state;

    return (
      <div className="avatar-zone">
        <div className="drop-zone">
          <Dropzone
            onDrop={acceptedFiles => this.setImageInBase64(acceptedFiles[0])}
            disableClick
            multiple={false}
          >
            {({ getRootProps }) => {
              return (
                <div {...getRootProps()}>
                  <ReactAvatarEditor
                    ref={ref => (this.ref = ref)}
                    scale={parseFloat(scale)}
                    width={this.props.width || width}
                    height={this.props.height || height}
                    rotate={parseFloat(rotate)}
                    borderRadius={width / (100 / borderRadius)}
                    image={image}
                    className="editor-canvas"
                  />
                </div>
              );
            }}
          </Dropzone>
          <input
            id="file-avatar"
            type="file"
            className="d-none"
            onChange={e => this.setImageInBase64(e.target.files[0])}
          />
          <label htmlFor="file-avatar">
            choose your <span className="font-weight-bold">file</span> or drop it{' '}
            <span className="font-weight-bold">here</span>
          </label>
          {isEditing && (
            <div className="editor">
              Load from url:
              <div>
                <input type="text" value={tempImage} onChange={this.handleChangeTempImage} />
                <button className="btn" onClick={this.handleLoadTempImage}>
                  Download image
                </button>
              </div>
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
              <div className="d-flex align-items-center">
                Rotate:
                <button className="m-1" onClick={this.handleRotate(true)}>
                  Left
                </button>
                <button className="" onClick={this.handleRotate(false)}>
                  Right
                </button>
              </div>
              <br />
              <div className="btn-group">
                <button className="btn bg-primary" onClick={this.handleSaveImage}>
                  Save image settings
                </button>
              </div>
            </div>
          )}
        </div>
        {!isEditing && (
          <button
            className="btn"
            onClick={() => {
              this.setState({ isEditing: true });
            }}
          >
            Edit
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = () => dispatch => ({
  saveNewAvatar: image => dispatch(saveNewAvatar(image)),
  handleLoadingTempImage: (img, cb) => dispatch(handleLoadingTempImage(img, cb))
});

export default connect(
  null,
  mapDispatchToProps
)(MyAvatarEditor);
