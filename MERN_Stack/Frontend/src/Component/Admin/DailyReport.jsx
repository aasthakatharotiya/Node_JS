import React, { useEffect, useRef } from 'react';

export default function DailyReport() {
  // Canvas ke references store karne ke liye useRef use karo
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const destroyChart = (chartRef) => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };

    destroyChart(lineChartRef);
    lineChartRef.current = new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Sales',
          data: [100, 200, 150, 250, 300, 350],
          borderColor: 'blue',
          fill: false
        }]
      }
    });

    // Bar Chart (Daily Revenue)
    destroyChart(barChartRef);
    barChartRef.current = new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenue',
          data: [500, 700, 650, 800, 900, 1000],
          backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'yellow']
        }]
      }
    });

    // Doughnut Chart (Task Completion)
    destroyChart(doughnutChartRef);
    doughnutChartRef.current = new Chart(document.getElementById('doughnutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'In Progress'],
        datasets: [{
          data: [60, 20, 20],
          backgroundColor: ['green', 'red', 'yellow']
        }]
      }
    });

    // Pie Chart (Product Distribution)
    destroyChart(pieChartRef);
    pieChartRef.current = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels: ['Product A', 'Product B', 'Product C'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['blue', 'orange', 'purple']
        }]
      }
    });

    // Cleanup function for unmounting
    return () => {
      destroyChart(lineChartRef);
      destroyChart(barChartRef);
      destroyChart(doughnutChartRef);
      destroyChart(pieChartRef);
    };

  }, []);

  return (
    <div className="Admin_Daily_Report">
      <h2>Daily Report Charts</h2>
      <div className="chart-container">
        <div className="chart-card">
          <h3>Weekly Sales</h3>
          <canvas id="lineChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Daily Revenue</h3>
          <canvas id="barChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Task Completion</h3>
          <canvas id="doughnutChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Product Distribution</h3>
          <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>
  );
}
