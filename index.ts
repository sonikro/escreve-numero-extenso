const NUMBER_WORD_ARRAY: Array<any> = [
  {
    factor: 1,
    mod: 1,
    numbers: {
      "1": "um",
      "2": "dois",
      "3": "três",
      "4": "quatro",
      "5": "cinco",
      "6": "seis",
      "7": "sete",
      "8": "oito",
      "9": "nove",
      "0": "zero",
    },
  },
  {
    factor: 2,
    mod: 1,
    special: true,
    numbers: {
      "10": "dez",
      "11": "onze",
      "12": "doze",
      "13": "treze",
      "14": "quatorze",
      "15": "quinze",
      "16": "dezesseis",
      "17": "dezessete",
      "18": "dezoito",
      "19": "dezenove",
    },
  },
  {
    factor: 2,
    mod: 10,
    numbers: {
      "20": "vinte",
      "30": "trinta",
      "40": "quarenta",
      "50": "cinquenta",
      "60": "sessenta",
      "70": "setenta",
      "80": "oitenta",
      "90": "noventa",
    },
  },
  {
    factor: 3,
    mod: 100,
    numbers: {
      "100": {
        direct: "cem",
        compound: "cento",
      },
      "200": "duzentos",
      "300": "trezentos",
      "400": "quatrocentos",
      "500": "quinhentos",
      "600": "seiscentos",
      "700": "setecentos",
      "800": "oitocentos",
      "900": "novecentos"
    },
  },
];

const convertNumberToString = (number: number) => {
  const numberString = number.toString();
  const numberSize = numberString.length;
  let sumOfParts = 0;
  let currentFactor = numberSize; //Start with the biggest number
  let currentIndex = 0;
  let result = "";
  while (sumOfParts < number) {
    const currentNumber = parseInt(numberString.substring(currentIndex));
    currentFactor = currentNumber.toString().length;
    let factorNumbers;
    if (currentNumber >= 10 && currentNumber < 20) {
      factorNumbers = NUMBER_WORD_ARRAY.find(
        (target) => target.factor === currentFactor && target.special === true
      );
    } else {
      factorNumbers = NUMBER_WORD_ARRAY.find(
        (target) =>
          target.factor === currentFactor && target.special == undefined
      );
    }
    if (!factorNumbers) {
      throw new Error(`Missing factor numbers for factor ${currentFactor}`);
    }
    const factorPureNumber =
      currentNumber - (currentNumber % factorNumbers.mod);
    const myNumberObject = factorNumbers.numbers[factorPureNumber];
    if (!myNumberObject) {
      throw new Error(
        `Missing number ${factorPureNumber} on factor ${JSON.stringify(
          factorNumbers
        )}`
      );
    }
    const directNumber = myNumberObject.direct ?? myNumberObject;
    const compoundNumber = myNumberObject.compound ?? myNumberObject;
    if (factorPureNumber === currentNumber) {
      result += `${directNumber}`;
    } else {
      result += `${compoundNumber}`;
    }

    sumOfParts += factorPureNumber;
    if (sumOfParts !== number) {
      result += " e ";
    }
    currentIndex++;
  }
  return result;
};

for (let index = 1; index < 1000; index++){
    console.log(`${index} = ${convertNumberToString(index)}`)   
}