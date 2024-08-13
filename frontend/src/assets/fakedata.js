export const lineChartData = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday", 
        "Saturday",
        "Sunday"
    ],
    datasets: [
        {
            label: "Steps",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: To show fill under the line
            borderWidth: 1, // Optional: Width of the line
            pointRadius: 5 // Optional: Radius of data points
        },
        {
            label: "My Steps",
            data: [2000, 3000, 5000, 2000, 500, 6000, 7000],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: To show fill under the line
            borderWidth: 1, // Optional: Width of the line
            pointRadius: 5 // Optional: Radius of data points
        }
    ]
}
