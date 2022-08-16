

 const weeklyData = (
    grapData,
    flow,
    coherance,
    flowPercentChange,
    coherancePercentageChange
  ) => {
    const updatedOverallGraph = grapData[0].dataItem.map((val, index) => {
      return {
        ...val,
        data: [
          {
            name: "Group A",
            value:
              index == 0
                ? 100 - (flow ? flow : 0)
                : index == 1
                ? 100 - (flowPercentChange ? (flowPercentChange) : 0)
                : index == 2
                ? 100 - (coherance ? coherance : 0)
                : 100 -
                  (coherancePercentageChange
                    ? (coherancePercentageChange)
                    : 0),
          },
          {
            name: "Group B",
            value:
              index == 0
                ? flow
                  ? flow
                  : 0
                : index == 1
                ? flowPercentChange
                  ? (flowPercentChange)
                  : 0
                : index == 2
                ? coherance
                  ? coherance
                  : 0
                : coherancePercentageChange
                ? (coherancePercentageChange)
                : 0,
          },
        ],
      };
    });
    let updateOverallGraphhData = grapData.map((el) => {
      return {
        ...el,
        dataItem: updatedOverallGraph,
      };
    });
    return updateOverallGraphhData;
  };

export default weeklyData;