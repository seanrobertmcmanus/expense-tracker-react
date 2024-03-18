import React, { useState, useEffect, useRef } from "react";

import classes from "../styles/charts/sideBarChart.module.css";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

interface Props {
  labels: string[];
  title?: string;
  dataset: { label: string; data: number[] }[];
  options?: ChartOptions<"bar">;
  isEmpty: boolean;
}

export default function GroupedSideBarChart({
  labels,
  title,
  dataset,
  options,
  isEmpty,
}: Props) {
  // Force Graph resize because of chart js (2 year old) bug :)

  if (isEmpty) {
    return (
      <div className={`${classes.graphCard}`}>
        <h3 className={`${classes.graphTitle}`}>{title}</h3>
        <p className={`${classes.is_empty_message}`}>
          No Financial Accounts Created
        </p>
      </div>
    );
  }
  // Dataset
  const chart_data: ChartData<"bar"> = {
    labels: labels,
    datasets: dataset,
  };

  // Options
  const default_options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y", // Set the index axis to 'y' for horizontal bars

    layout: {
      padding: {
        top: 4,
        right: 4,
        bottom: 4,
        left: 4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },

        stacked: false,
        beginAtZero: true,
        ticks: {
          font: {
            size: 8,
            weight: 600,
          },
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        stacked: true,
        beginAtZero: true,
        ticks: {
          autoSkip: false, // Prevents skipping of labels
          maxRotation: 0, // Keeps labels horizontal
          minRotation: 0,
          font: {
            size: 10,
            weight: 500,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    events: [],
  };

  const chartOptions = { ...default_options, ...options };

  return (
    // Card
    <div className={`${classes.graphCard}`}>
      {/* Title */}
      {title && <h3 className={`${classes.graphTitle}`}>{title}</h3>}
      {/* Chart */}
      <div className={`${classes.graphContainer}`}>
        <Bar
          className={`${classes.canvas}`}
          data={chart_data}
          options={chartOptions}
          height={"100%"}
          width={"80%"}
        />
      </div>
    </div>
  );
}
