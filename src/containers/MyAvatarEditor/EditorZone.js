import React from 'react';

export const EditorZone = ({
  tempImage,
  handleChangeTempImage,
  handleLoadTempImage,
  handleScale,
  handleRotate
}) => {
  return (
    <div className="editor fz-20">
      <div className="d-flex align-items-center mb-2">
        <span className="icon-link fz-20" />
        <input
          type="text"
          className="ml-1 p-1 icon-link"
          value={tempImage}
          placeholder="Put url here..."
          onChange={handleChangeTempImage}
        />
        {!!tempImage && (
          <span
            onClick={handleLoadTempImage}
            className="icon-download2 btn fz-16 cursor-pointer m-0"
          />
        )}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mb-2">
        <h4>Zoom:</h4>
        <input
          name="scale"
          type="range"
          onChange={handleScale}
          min={'0.1'}
          max="4"
          step="0.01"
          defaultValue="1"
        />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h4>Rotate:</h4>
        <div className="d-flex">
          <button className="m-1 btn icon-undo" onClick={handleRotate(true)} />
          <button className="icon-redo btn" onClick={handleRotate(false)} />
        </div>
      </div>
    </div>
  );
};
