import "./Input.scss";

function Input({placeholder, type}) {
  return (
    <div className="Input">
      <input type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input;