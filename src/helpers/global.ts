import { ref, watchEffect } from "vue";

function useScreen() {
  const screenWidth = ref(window.innerWidth);
  const screenHeight = ref(window.innerHeight);

  const updateScreen = () => {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
  };

  watchEffect(() => {
    updateScreen();

    window.addEventListener("resize", updateScreen);

    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  });

  return { screenWidth, screenHeight };
}

function numberFormat(inputNumber: number | string, isCurrency = false) {
  const number =
    typeof inputNumber === "string" ? parseInt(inputNumber, 10) : inputNumber;
  if (isNaN(number)) return "-";

  let data: any = parseInt(inputNumber.toString());

  if (isCurrency) {
    data = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(data);
  } else {
    data = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(data);
  }

  return data;
}
/* eslint-disable no-useless-escape */
const all_characters = /[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n ]/;
const numbers_characters = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n]/;
const numbers_letters = /[a-zA-Z0-9\n ]/;
const numbers_positive = /[0-9\n]/;
const numbers_positive_negative = /[0-9-\n]/;
const letters = /[a-zA-Z\n ]/;
const letters_characters = /[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n ]/;
const username = /[a-zA-Z0-9_-]/;
const address = /[a-zA-Z0-9#;'":,. \n]/;
const phone = /[a-zA-Z0-9-()\n ]/;
const email = /[a-zA-Z0-9@\-._ ]/;
const character_search = /[a-zA-Z0-9@. ]/;

export {
  useScreen,
  numberFormat,
  all_characters,
  numbers_characters,
  numbers_letters,
  numbers_positive,
  numbers_positive_negative,
  letters,
  letters_characters,
  username,
  address,
  phone,
  email,
  character_search,
};
