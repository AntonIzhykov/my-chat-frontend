import React from 'react';
import { connect } from 'react-redux';
import ReactAvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { saveNewAvatar, handleLoadingTempImage } from '../../store/chat';
import { getBase64FromFile, getBase64FromUrl } from '../../helpers';
import Tippy from '@tippy.js/react';
import { EditorZone } from './EditorZone';

class MyAvatarEditor extends React.Component {
  state = {
    image: '',
    scale: 1,
    rotate: 0,
    borderRadius: 100,
    width: 200,
    height: 200,
    newAvatar: null
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
        borderRadius: 100,
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
    this.props.closeEditorZone();
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

  render() {
    const { scale, rotate, width, height, borderRadius, image, tempImage = '' } = this.state;

    const { closeEditorZone, openEditorZone, showEditorZone } = this.props;

    return (
      <div className="avatar-zone">
        <Tippy
          content={
            <EditorZone
              handleChangeTempImage={this.handleChangeTempImage}
              handleLoadTempImage={this.handleLoadTempImage}
              handleRotate={this.handleRotate}
              handleScale={this.handleScale}
              tempImage={tempImage}
            />
          }
          visible={showEditorZone}
          onHidden={closeEditorZone}
          placement="right-start"
          theme="avatar-editor"
          interactive={true}
          distance={15}
          inertia={true}
          appendTo={document.body}
        >
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
              <div className="icon-download2 fz-24" />
              <div>
                choose your <span className="font-weight-bold">file</span>
              </div>
              <div>
                or drop it <span className="font-weight-bold">here</span>
              </div>
            </label>
          </div>
        </Tippy>
        {showEditorZone ? (
          <button className="btn bg-primary mt-2" onClick={this.handleSaveImage}>
            <span className="icon-reply fz-24">Save image</span>
          </button>
        ) : (
          <button className="btn mt-2" onClick={openEditorZone}>
            <span className="icon-equalizer fz-24"> Edit image</span>
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
