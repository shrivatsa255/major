const Button = ({ classStyles, btnName, handleClick, disabled }) => (
  <button type="button" className={`bg-indigo-700 text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`} onClick={handleClick} disabled={disabled}>
    {btnName}
  </button>
);

export default Button;
