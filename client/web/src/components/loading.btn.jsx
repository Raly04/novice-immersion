import React, { useState } from "react";
import ReactiveButton from "reactive-button";

function LoadingBtn({ state, handler, className }) {
  return (
    <ReactiveButton
      className={className}
      buttonState={state}
      type="submit"
      idleText = "Publier"
      loadingText = "Publication"
      successText = "Publiee"
      onClick={handler}
    />
  );
}

export default LoadingBtn;
