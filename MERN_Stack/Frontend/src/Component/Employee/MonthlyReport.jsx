import React, { useEffect, useRef } from 'react'

export default function MonthlyReport() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const destroyChart = (chartRef) => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };

    // Monthly Revenue Trend (Line Chart)
    destroyChart(lineChartRef);
    lineChartRef.current = new Chart(document.getElementById('monthlyLineChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Monthly Revenue',
          data: [5000, 7000, 6500, 8000, 9000, 10000, 9500, 11000, 12000, 13000, 12500, 14000],
          borderColor: 'blue',
          fill: false
        }]
      }
    });

    // Monthly Expenses vs Revenue (Bar Chart)
    destroyChart(barChartRef);
    barChartRef.current = new Chart(document.getElementById('monthlyBarChart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: [5000, 7000, 6500, 8000, 9000, 10000, 9500, 11000, 12000, 13000, 12500, 14000],
            backgroundColor: 'green'
          },
          {
            label: 'Expenses',
            data: [3000, 4500, 4000, 5000, 5500, 6000, 5800, 7000, 7500, 8200, 8000, 8500],
            backgroundColor: 'red'
          }
        ]
      }
    });

    // Monthly Category Distribution (Doughnut Chart)
    destroyChart(doughnutChartRef);
    doughnutChartRef.current = new Chart(document.getElementById('monthlyDoughnutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Research', 'Planning', 'Design', 'Development', 'Maintenance'],
        datasets: [{
          data: [35, 25, 20, 10, 10],
          backgroundColor: ['blue', 'orange', 'green', 'purple', 'gray']
        }]
      }
    });

    // Monthly Customer Growth (Pie Chart)
    destroyChart(pieChartRef);
    pieChartRef.current = new Chart(document.getElementById('monthlyPieChart'), {
      type: 'pie',
      data: {
        labels: ['New Customers', 'Returning Customers'],
        datasets: [{
          data: [60, 40],
          backgroundColor: ['cyan', 'magenta']
        }]
      }
    });

    return () => {
      destroyChart(lineChartRef);
      destroyChart(barChartRef);
      destroyChart(doughnutChartRef);
      destroyChart(pieChartRef);
    };

  }, []);

  return (
    <div className="Admin_Monthly_Report">
      <div className="chart-container">
      <div className="chart-card">
          <h3>Category Distribution</h3>
          <canvas id="monthlyDoughnutChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Customer Growth</h3>
          <canvas id="monthlyPieChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Monthly Revenue Trend</h3>
          <canvas id="monthlyLineChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Monthly Expenses vs Revenue</h3>
          <canvas id="monthlyBarChart"></canvas>
        </div>
      </div>
    </div>
  );
}
