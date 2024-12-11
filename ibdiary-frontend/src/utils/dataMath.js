const dataMath = (data, stats) => {
  const stressData = data[0].data;
  const symptomData = data[1].data;

  const colorArray = [
    "bg-blue-200",
    "bg-yellow-200",
    "bg-orange-300",
    "bg-red-300",
    "bg-red-500",
  ];

  const stressDataNoNull = stressData.reduce((x, y) => {
    if (y !== null) {
      x.push(y);
    }
    return x;
  }, []);

  const symptomDataNoNull = symptomData.reduce((x, y) => {
    if (y !== null) {
      x.push(y);
    }
    return x;
  }, []);
  let stressAverage = null;
  if (stressDataNoNull.length > 0) {
    stressAverage = (
      stressDataNoNull.reduce((x, y) => x + y) / stressDataNoNull.length
    ).toFixed(1);
  }
  let symptomAverage = null;
  if (symptomDataNoNull.length > 0) {
    symptomAverage = (
      symptomDataNoNull.reduce((x, y) => x + y) / stressDataNoNull.length
    ).toFixed(1);
  }

  const correlation = stats
    .sampleCorrelation(data[0].data, data[1].data)
    .toFixed(2);

  let correlationString =
    correlation >= 0.7
      ? "Strong Correlation"
      : correlation >= 0.3 && correlation < 0.7
      ? "Moderate Correlation"
      : correlation >= 0.1
      ? "Mild Correlation"
      : "No Obvious Correlation";

  let symptomColor = colorArray[Math.floor(symptomAverage)];
  let stressColor = colorArray[Math.floor(stressAverage)];
  //what do i want to calculate?
  //average for each - mean, median, mode -- mode is already represented on the graph though
  //correlation
  const noData =
    stressAverage === null && symptomAverage === null ? true : false;
  return {
    stressAverage,
    symptomAverage,
    correlationString,
    symptomColor,
    stressColor,
    noData,
  };
};

export default dataMath;
