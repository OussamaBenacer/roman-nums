const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const convertDigit = (degit, position) => {
  const digits = [
    ["I", "IV", "V", "IX"],
    ["X", "XL", "L", "XC"],
    ["C", "CD", "D", "CM"],
    ["M"],
  ];
  switch (degit) {
    case 0:
      return "";
    case 1:
      return digits[position][0];
    case 4:
      return digits[position][1];
    case 5:
      return digits[position][2];
    case 9:
      return digits[position][3];
    default:
      if (degit > 5)
        return convertDigit(5, position) + convertDigit(degit - 5, position);
      else return convertDigit(1, position) + convertDigit(degit - 1, position);
  }
};

const convertNumber = (num) => {
  let result = "";
  let length = num.toString().length;

  while (num > 0) {
    result += convertDigit(
      Math.floor(num / Math.pow(10, length - 1)),
      length - 1
    );
    num %= Math.pow(10, length - 1);
    length--;
  }
  return result;
};

const checkValue = () => {
  const number = parseInt(input.value);
  if (!input.value || isNaN(number)) {
    output.innerHTML = "Please enter a valid number";
    output.classList.add("invalid");
  } else if (number <= 0) {
    output.innerHTML = "Please enter a number greater than or equal to 1";
    output.classList.add("invalid");
  } else if (number > 3999) {
    output.innerHTML = "Please enter a number less than or equal to 3999";
    output.classList.add("invalid");
  } else {
    output.innerHTML = convertNumber(number);
    // input.value = "";
    output.classList.remove("invalid");
  }
};

convertBtn.addEventListener("click", checkValue);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkValue();
});
