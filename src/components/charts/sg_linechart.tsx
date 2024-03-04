import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';

interface Props {
    labels: string[];
    label?: string;
    dataset: number[];
    options?: ChartOptions<'line'>;
    height: string;
    width: string;

}

// Render a simple line chart with no interactivity, just a visual representation of data
export default function SimpleGraphicLineChart({labels, label, dataset, options, height, width}: Props){ 
    // Defaults
    // Options
    const default_options: ChartOptions<'line'> = {
        responsive: false,
        maintainAspectRatio : false,

        plugins: {
            legend: {
                display: false, // Optionally hide the legend if not needed
            },
        },
        layout: {
            padding: {
                top: 8,
                right: 0,
                bottom: -25,
                left: -10,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    display: false, // Hide X-axis labels
                     
                },
            },
            y: {
                beginAtZero: true, 
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    display: false, // Hide Y-axis labels
                },
            },
        },
        elements: {
            line: {
                tension: 0.4, // Smooth the line
                backgroundColor: 'rgba(49, 255, 49, 0.3)', // Background fill color (red with opacity)
                fill: true, // Enable filling under the line
                borderColor: 'rgb(49, 255, 49)',
            },
            point: {
                radius: 0, // Hide points
                hoverRadius: 0, // Hide points on hover
            },
        },
        interaction: {
            intersect: false,
            mode: 'nearest',
        },
            events: []
    };
    const chart_options = {...default_options, ...options};

    // Data
    const chart_dataset = [
        {
            label: label? label : '',
            data: dataset,
            hoverOffset: 24,
        },
    ];

    const chart_data: ChartData<'line'> = 
    {
        labels: labels,
        datasets: chart_dataset,

    };

    return (
        <>
        <Line data={chart_data} options={chart_options} height={height} width={width} />
        </>
    );
}