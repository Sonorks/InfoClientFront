
import { Chart } from "react-google-charts";
import React from 'react'

const CreditChart = (props) => {
    return (
        <Chart
                chartType="PieChart"
                data={[['Data', 'Value'], ['Available Credit', props.availableCredit], ['Used Credit', props.usedCredit]]}
                width="100%"
                height="400px"
                options={{
                  pieSliceText: 'value',
                  title: 'TOTAL CREDIT REPORT',
                  is3D: true
                }}
              />
    )
}

export default CreditChart;