
const PercentageChanges = (firstWeek, remainWeek) =>{
   let percentageChange = ((remainWeek - firstWeek )/remainWeek)*100
    return percentageChange
}

export default PercentageChanges;