import React, { useEffect, useRef } from 'react'

export default function YearlyReport() {
  const radarChartRef = useRef(null)
  const polarAreaChartRef = useRef(null)
  const bubbleChartRef = useRef(null)
  const doughnutChartRef = useRef(null)

  useEffect(() => {
    const destroyChart = (chartRef) => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }

    // Radar Chart (Revenue, Expenses, and Profit Comparison)
    destroyChart(radarChartRef)
    radarChartRef.current = new Chart(document.getElementById('radarChart'), {
      type: 'radar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [5000, 7000, 8000, 9500, 11000, 13000, 12500, 14000, 15500, 16500, 17500, 19000],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
          },
          {
            label: 'Expenses',
            data: [3000, 4500, 5000, 6000, 7000, 7500, 8000, 8500, 9000, 10000, 11000, 12000],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
          },
          {
            label: 'Profit',
            data: [2000, 2500, 3000, 3500, 4000, 5500, 4500, 5500, 6500, 6500, 6500, 7000],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
          }
        ]
      }
    })

    // Polar Area Chart (Department-wise Performance)
    destroyChart(polarAreaChartRef)
    polarAreaChartRef.current = new Chart(document.getElementById('polarAreaChart'), {
      type: 'polarArea',
      data: {
        labels: ['Sales', 'Marketing', 'IT', 'HR', 'Support'],
        datasets: [{
          data: [80, 65, 75, 50, 60],
          backgroundColor: ['blue', 'orange', 'green', 'red', 'purple']
        }]
      }
    })

    // Bubble Chart (Revenue vs Customers Growth)
    destroyChart(bubbleChartRef)
    bubbleChartRef.current = new Chart(document.getElementById('bubbleChart'), {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Revenue Growth',
            data: [
              { x: 1, y: 5000, r: 10 },
              { x: 2, y: 7000, r: 15 },
              { x: 3, y: 9000, r: 20 },
              { x: 4, y: 11000, r: 25 },
              { x: 5, y: 13000, r: 30 },
              { x: 6, y: 15000, r: 35 }
            ],
            backgroundColor: 'blue'
          },
          {
            label: 'Customer Growth',
            data: [
              { x: 1, y: 300, r: 10 },
              { x: 2, y: 450, r: 15 },
              { x: 3, y: 800, r: 20 },
              { x: 4, y: 1200, r: 25 },
              { x: 5, y: 1600, r: 30 },
              { x: 6, y: 2000, r: 35 }
            ],
            backgroundColor: 'green'
          }
        ]
      }
    })

    // Doughnut Chart (Sales Distribution by Product Category)
    destroyChart(doughnutChartRef)
    doughnutChartRef.current = new Chart(document.getElementById('doughnutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Frontend Developers', 'Backend Developers', 'UI/UX Designers', 'Project Managers', 'QA Testers'],
        datasets: [{
          data: [35, 25, 15, 15, 10],
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8']
        }]
      }
    })

    return () => {
      destroyChart(radarChartRef)
      destroyChart(polarAreaChartRef)
      destroyChart(bubbleChartRef)
      destroyChart(doughnutChartRef)
    }
  }, [])

  return (
    <div className="Admin_Yearly_Report">
      <div className="chart-container">
        <div className="chart-card">
          <h3>Revenue, Expenses, and Profit Comparison</h3>
          <canvas id="radarChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Department-wise Performance</h3>
          <canvas id="polarAreaChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Revenue vs Customer Growth</h3>
          <canvas id="bubbleChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Sales Distribution by Category</h3>
          <canvas id="doughnutChart"></canvas>
        </div>
      </div>
    </div>
  )
}
