import React from 'react';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';



interface Props {
    labels: string[];
    label?: string;
    dataset: number[];
    options?: ChartOptions<'pie'>;
    styles?: React.CSSProperties;
}

// Render an interactive pie chart
export default function PieChart({labels, label, dataset, options, styles}: Props) {
    // Defaults
    const colours = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        
    ];
    // Options
    const default_options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio : false,

        layout: {
            padding: {
                top: 8,
                right: 10,
                bottom: 8,
                left: 8,
            },
            
        },
        plugins: {
            legend: {
                position: 'left',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 10,
                    boxWidth: 15,
                    boxHeight: 20,
                    // Customize font, color, etc.
                    font: {
                        size: 12,
                        family: "Lato, sans-serif",
                        // ... other font properties
                    },
                    color: '#6b7280',
                },
            },

        },
    };

    // Data
    const chart_dataset = [
        {
            label: label? label : '',
            data: dataset,
            backgroundColor: dataset.map((_, i) => colours[i]),
            borderColor: dataset.map((_, i) => colours[i]),
            hoverOffset: 24,
            borderWidth: 1,
        },
    ];

    const chart_data: ChartData<'pie'> = 
        {
            labels: labels,
            datasets: chart_dataset,

        };

    // Options
    // Merge default options with passed options (override specific default options with passed in options)
    const merged_options = {...default_options, ...options};


    return (
        <Pie data={chart_data} options={merged_options}/>
    )



}