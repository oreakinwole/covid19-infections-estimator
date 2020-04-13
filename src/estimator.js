/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const getImpact = (value) => {
    const { periodType } = value;
    let { timeToElapse } = value;
    const { reportedCases } = value;
    const { totalHospitalBeds } = value;
    const { region } = value;
    const { avgDailyIncomeInUSD } = region;
    const { avgDailyIncomePopulation } = region;

    const currentlyInfected = Math.trunc(reportedCases * 10);

    if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
    if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);

    const powerFactor = Math.trunc(timeToElapse / 3);

    const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** powerFactor));
    const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);

    const availableBeds = Math.trunc(0.35 * totalHospitalBeds);
    const hospitalBedsByRequestedTime = Math.trunc(availableBeds - severeCasesByRequestedTime);

    const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
    const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
    let dollarsInFlight = (infectionsByRequestedTime * avgDailyIncomePopulation
        * avgDailyIncomeInUSD) / timeToElapse;
    dollarsInFlight = Math.trunc(dollarsInFlight);

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  const getSevereImpact = (value) => {
    const { periodType } = value;
    let { timeToElapse } = value;
    const { reportedCases } = value;
    const { totalHospitalBeds } = value;
    const { region } = value;
    const { avgDailyIncomeInUSD } = region;
    const { avgDailyIncomePopulation } = region;

    const currentlyInfected = Math.trunc(reportedCases * 50);

    if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
    if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);

    const powerFactor = Math.trunc(timeToElapse / 3);

    const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** powerFactor));
    const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);

    const availableBeds = Math.trunc(0.35 * totalHospitalBeds);
    const hospitalBedsByRequestedTime = Math.trunc(availableBeds - severeCasesByRequestedTime);

    const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
    const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
    let dollarsInFlight = (infectionsByRequestedTime * avgDailyIncomePopulation
        * avgDailyIncomeInUSD) / timeToElapse;
    dollarsInFlight = Math.trunc(dollarsInFlight);

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  const impact = getImpact(data);
  const severeImpact = getSevereImpact(data);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
