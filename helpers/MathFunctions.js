const calculateWeightMs = (weight, ms) => {
  return (weight - Math.log(ms)) / (weight + Math.log(ms));
};

module.exports = { calculateWeightMs };
