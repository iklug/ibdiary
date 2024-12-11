const pieChartData = (data, arrayOfDays) => {
  let stress0 = 0;
  let stress1 = 0;
  let stress2 = 0;
  let stress3 = 0;
  let stress4 = 0;

  let symptoms0 = 0;
  let symptoms1 = 0;
  let symptoms2 = 0;
  let symptoms3 = 0;
  let symptoms4 = 0;

  for (let i = 0; i < arrayOfDays.length; i++) {
    let dayHasData = data[arrayOfDays[i]];
    if (dayHasData) {
      dayHasData.stress === 0
        ? stress0++
        : dayHasData.stress === 1
        ? stress1++
        : dayHasData.stress === 2
        ? stress2++
        : dayHasData.stress === 3
        ? stress3++
        : dayHasData.stress === 4
        ? stress4++
        : "";

      dayHasData.symptoms === 0
        ? symptoms0++
        : dayHasData.symptoms === 1
        ? symptoms1++
        : dayHasData.symptoms === 2
        ? symptoms2++
        : dayHasData.symptoms === 3
        ? symptoms3++
        : dayHasData.symptoms === 4
        ? symptoms4++
        : "";
    }
  }
  let stressZeroPercentage =
    (stress0 / arrayOfDays.length).toFixed(2).split(".")[1] + "%";
  console.log(stressZeroPercentage);
  return [
    {
      data: [
        {
          id: 0,
          value: stress0,
          label: "None",
          color: "#60a5fa",
        },
        { id: 1, value: stress1, label: "Mild", color: "#fde047" },
        {
          id: 2,
          value: stress2,
          label: "Moderate",
          color: "#fb923c",
        },
        { id: 3, value: stress3, label: "Severe", color: "#ef4444" },
        { id: 4, value: stress4, label: "Extreme", color: "#b91c1c" },
      ],
    },
    {
      data: [
        { id: 0, value: symptoms0, label: "None", color: "#60a5fa" },
        { id: 1, value: symptoms1, label: "Mild", color: "#fde047" },
        { id: 2, value: symptoms2, label: "Moderate", color: "#fb923c" },
        { id: 3, value: symptoms3, label: "Severe", color: "#ef4444" },
        { id: 4, value: symptoms4, label: "Extreme", color: "#b91c1c" },
      ],
    },
  ];
};

export default pieChartData;
