const getGraphData = (data, arrayOfDays) => {
  const stressArray = [];
  const symptomsArray = [];

  for (let i = 0; i < arrayOfDays.length; i++) {
    let stress = null;
    let symptoms = null;
    let dayHasData = data[arrayOfDays[i]];
    if (dayHasData) {
      stress = dayHasData.stress;
      symptoms = dayHasData.symptoms;
    }
    stressArray.push(stress);
    symptomsArray.push(symptoms);
  }

  return [{ data: [...stressArray] }, { data: [...symptomsArray] }];
};

export default getGraphData;
