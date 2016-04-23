import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

export default class Chart extends Component {
    
    constructor() {
        super();
        this.startYear = 2016;
        this.startMonth = 3;
        this.numMonths = 10 * 12;
        this.config = this.generateConfig();
    }
    
    render() {
        return (
            <ReactHighcharts config={this.config}></ReactHighcharts>
        )
    }

    generateConfig() {
        
        var data = []
        
        for (var monthIdx = 0; monthIdx < this.numMonths; monthIdx++) {
            var year = this.startYear + (this.startMonth + monthIdx) / 12;
            var month = (this.startMonth + monthIdx) % 12;
            var date = new Date(year, month, 1);
            
            data.push([date.valueOf(), this.rentalIncome(date)])
        }
        
        return {
            chart: {
                type: 'column',
                zoomType: 'x'
            },
            xAxis: {
                type: 'datetime'
            },
            series: [{
                data: data
            }]
        };
    }
    
    rentalIncome(date) {
        var leaseRenewalDate = new Date(2016, 6, 1);
        var annualRentAppreciation = 0.02;
        if (date < leaseRenewalDate) {
            return 1600.0;            
        } else {
            var monthIdx0 = leaseRenewalDate.getFullYear() * 12 + leaseRenewalDate.getUTCMonth();
            var monthIdx = date.getFullYear() * 12 + date.getUTCMonth();
            var yearIdx = Math.floor((monthIdx - monthIdx0) / 12);
            return 2200.0 * Math.pow((1 + annualRentAppreciation), yearIdx);
        }
    }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world</h1>
        <Chart/>
      </div>
    );
  }
}
