



import { Chart } from "react-google-charts";
import React from 'react'

const VisitsPerCityChart = (props) => {
    let output = [['City', 'Visits']]
    props.visitsPerCity.map((visitPerCity) => {
        output.push([visitPerCity.city, visitPerCity.number])
    })
    return (
        <Chart
                chartType="BarChart"
                data={output}
                width="100%"
                height="400px"
                options={{
                  pieSliceText: 'value',
                  title: 'TOTAL VISITS PER CITY',
                }}
              />
    )
}

export default VisitsPerCityChart;