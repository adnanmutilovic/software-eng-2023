import React from "react";

const Comparison = ({ currency1, currency2, conversionRate }) => {
  return (
    <div className="comparison-container">
      <p>
        1 {currency1} = {conversionRate.toFixed(4)} {currency2}
      </p>
    </div>
  );
};

export default Comparison;
