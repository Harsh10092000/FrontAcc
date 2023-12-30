import React from "react";

const image = () => {
  const handleImage = (event) => {
    setFile(event[0]);
    var pattern = /image-*/;
    if (!event[0].type.match(pattern)) {
      setFormatError(true);
      setFileSizeExceeded(false);
      return;
    } else if (event[0].size > maxFileSize) {
      setFileSizeExceeded(true);
      setFormatError(false);
      return;
    } else {
      setFileSizeExceeded(false);
      setFormatError(false);
      return;
    }
  };

  //const [dragActive, setDragActive] = useState(false);
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return;
    // if (e.type === "dragenter" || e.type === "dragover") {
    //   setDragActive(true);
    // } else if (e.type === "dragleave") {
    //   setDragActive(false);
    // }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("e.dataTransfer.files : ", e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };
};

export default image;
