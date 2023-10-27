function formatFinancialNumber(number) {
  if (typeof number !== "number") {
    return "Invalid Input";
  }

  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "decimal", // Use "decimal" style to exclude currency symbol
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return formattedNumber;
}

const formatNumber = (value) => {
  // Remove non-numeric characters except the dot
  const numericValue = value.replace(/[^0-9.]/g, "");

  // Split the value into integer and decimal parts
  const [integerPart, decimalPart] = numericValue.split(".");

  // Format the integer part with thousands separators
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Limit the decimal part to two decimal places
  const formattedDecimalPart =
    decimalPart && decimalPart.length > 2
      ? decimalPart.slice(0, 2)
      : decimalPart || "00";

  // Combine the integer and decimal parts
  const formattedValue =
    decimalPart === undefined
      ? formattedIntegerPart
      : `${formattedIntegerPart}.${formattedDecimalPart}`;

  return formattedValue;
};

function formatDate(dateString) {
  if (dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/${month}/${year}`;
  }
  return "";
}

export { formatFinancialNumber, formatDate, formatNumber };




 // const formatNumber = (value) => {
  //   // Remove non-digit characters and leading zeros
  //   const numericValue = value.replace(/[^0-9.]/g, '').replace(/^0+/, '');

  //   // Split into integer and decimal parts
  //   const [integerPart, decimalPart] = numericValue.split('.');

  //   // Add thousands separators
  //   const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  //   // Combine integer and decimal parts
  //   let formattedValue = formattedIntegerPart;
  //   if (decimalPart !== undefined) {
  //     formattedValue += '.' + decimalPart;
  //   }

  //   return formattedValue;
  // };
