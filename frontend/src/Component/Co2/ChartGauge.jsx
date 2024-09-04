import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';
import "../../index.css";

// Initialize the modules
HighchartsMore(Highcharts);
SolidGauge(Highcharts);
// Exporting(Highcharts);
// ExportData(Highcharts);
// Accessibility(Highcharts);

const ChartGauge = () => {
  // Define the options for the charts
  const speedOptions = {
    chart: {
      type: 'solidgauge',
      renderTo: 'container-speed'
    },
    title: null,
    pane: {
      center: ['50%', '50%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: Highcharts.defaultOptions.backgroundColor,
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    tooltip: {
      enabled: false
    },
    series: [{
      name: 'Speed',
      data: [80],
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:25px">{y}</span><br/><span style="font-size:12px;opacity:0.4">km/h</span></div>'
      }
    }]
  };

  const rpmOptions = {
    chart: {
      type: 'solidgauge',
      renderTo: 'container-rpm'
    },
    title: null,
    pane: {
      center: ['50%', '50%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: Highcharts.defaultOptions.backgroundColor,
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    tooltip: {
      enabled: false
    },
    series: [{
      name: 'RPM',
      data: [1500],
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:25px">{y}</span><br/><span style="font-size:12px;opacity:0.4">rpm</span></div>'
      }
    }]
  };

  return (
    <figure className="highcharts-figure">
      <div id="container-speed" >
        <HighchartsReact
          highcharts={Highcharts}
          options={speedOptions}
        />
      </div>
      <div id="container-rpm" className="chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          options={rpmOptions}
        />
      </div>
      <p className="highcharts-description">
        Chart demonstrating solid gauges with dynamic data. Two separate charts
        are used, and each is updated dynamically every few seconds. Solid
        gauges are popular charts for dashboards, as they visualize a number
        in a range at a glance. As demonstrated by these charts, the color of
        the gauge can change depending on the value of the data shown.
      </p>
    </figure>
  );
};

export default ChartGauge;
