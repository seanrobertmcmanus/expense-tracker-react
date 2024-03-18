import React, { useState, useEffect } from "react";
import classes from "../styles/cards/iiaSummary.module.css";
import PieChart from "../charts/pieChart";
import SimpleGraphicLineChart from "../charts/sg_linechart";
import type { ChartOptions } from "chart.js";
import CountUp from "react-countup";

// Hold the summary of the user's income and assets
export default function IIASummary() {
  // Control rendering of graphical components
  const [isMobile, setIsMobile] = useState(window.innerWidth < 580);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 580);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const tempVal = 100000;

  // Temp Chart Data
  // Pie Chart Income Data
  const label = "Income Breakdown";
  const labels = ["Salary", "Investments", "Other", "Savings", "Pension"];
  const dataset = [1000, 2000, 3000, 4000, 5000];
  // Line Chart Asset Data
  const lc_labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const lc_dataset = [
    1000, 2000, 3000, 3000, 1000, 2000, 3000, 1000, 1000, 2000, 5000, 3000,
  ];
  const lc_label = "Asset Value";
  const micro_pie_chart_settings: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={`${classes.summary}`}>
      <h1 className={`${classes.section__title}`}>Income and Assets Summary</h1>
      <div className={`${classes.income_summary__container}`}>
        {/* Income Source Breakdown (Pie Chart) */}
        <div className={`${classes.summary__card}`}>
          <h2 className={`${classes.summary__card__header}`}>Income Sources</h2>
          <div className={`${classes.summary__pie_chart__container}`}>
            {isMobile ? (
              <PieChart
                labels={labels}
                label={label}
                dataset={dataset}
                options={micro_pie_chart_settings}
              />
            ) : (
              <PieChart labels={labels} label={label} dataset={dataset} />
            )}
          </div>
        </div>

        <div className={`${classes.income_summary_details__container}`}>
          {/* Total Asset Value + line chart*/}
          <div className={`${classes.summary__card}`}>
            <h2 className={`${classes.summary__card__header}`}>
              Total Asset Value
            </h2>
            <div className={`${classes.summary__card__content}`}>
              {/* Line Chart */}
              <div className={`${classes.summary__card__graph}`}>
                {isMobile ? null : (
                  <SimpleGraphicLineChart
                    labels={lc_labels}
                    label={lc_label}
                    dataset={lc_dataset}
                    height={"70px"}
                    width={"250px"}
                  />
                )}
              </div>

              <div className={`${classes.summary__card__details}`}>
                <h3 className={`${classes.summary__card__details_title}`}>
                  {" "}
                  Assets:{" "}
                </h3>
                <CountUp end={tempVal} duration={1} separator="," prefix="£" />
              </div>
            </div>
          </div>
          {/* Total Income All/Year/Month */}
          <div className={`${classes.summary__card}`}>
            <h2 className={`${classes.summary__card__header}`}>
              Income This Month
            </h2>
            <div className={`${classes.summary__card__content}`}>
              {/* Line Chart */}
              <div className={`${classes.summary__card__graph}`}>
                {isMobile ? null : (
                  <SimpleGraphicLineChart
                    labels={lc_labels}
                    label={lc_label}
                    dataset={lc_dataset}
                    height={"70px"}
                    width={"250px"}
                  />
                )}
              </div>

              <div className={`${classes.summary__card__details}`}>
                <h3 className={`${classes.summary__card__details_title}`}>
                  {" "}
                  This Month:{" "}
                </h3>
                <CountUp end={tempVal} duration={1} separator="," prefix="£" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
