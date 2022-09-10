import { useState } from "react";
import "./InputBtn.css";

function InputBtn({ btnText, btnCb, inputPlaceHolder }) {
  const [inputValue, setInputValue] = useState("");

  const handlerOnChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="InputBtn">
      <input
        type="text"
        placeholder={inputPlaceHolder}
        onChange={handlerOnChange} />
      <button onClick={() => btnCb(inputValue)}>{btnText}</button>
    </div>
  )
}

export default InputBtn;