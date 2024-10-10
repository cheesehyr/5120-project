import React, {useEffect, useState} from "react";
import {LineChart} from "@mui/x-charts/LineChart";
import {Card, CardContent, Typography} from "@mui/material";

// General function to parse data for different forecasts
const parseForecastData = (forecastType, apiResponse) => {
    const dailyInfo = apiResponse.dailyInfo || [];
    return dailyInfo.map((dayInfo) => {
        const date = `${String(dayInfo.date.day).padStart(2, '0')}/${String(dayInfo.date.month).padStart(2, '0')}/${dayInfo.date.year}`;
        return {
            date,
            value: dayInfo[forecastType],
        };
    });
};

// Reusable Forecast Chart component
const ForecastChart = ({apiResponse, forecastType, chartTitle, lineColor}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Parse the forecast data whenever apiResponse or forecastType changes
        const parsedData = parseForecastData(forecastType, apiResponse);
        console.log("Parsed data:", parsedData);
        setChartData(parsedData);
    }, [apiResponse, forecastType]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {chartTitle}
                </Typography>
                {chartData.length > 0 ? (
                    <LineChart
                        xAxis={[
                            {
                                id: 'forecast-date',
                                dataKey: 'date',  // Use the 'date' field for the x-axis
                                label: 'Date',    // Label for the x-axis
                                scaleType: 'point', 
                            },
                        ]}
                        yAxis={[
                            {
                                id: 'forecast-value',
                                
                            },
                        ]}
                        width={400}
                        height={200}
                        dataset={chartData}
                        series={[
                            {
                                id: 'series',
                                dataKey: 'value',
                                color: lineColor,
                            },
                        ]}
                        margin={{top: 20, right: 30, left: 40, bottom: 20}}/>
                ) : (
                    <Typography variant="body2">No data available</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ForecastChart;