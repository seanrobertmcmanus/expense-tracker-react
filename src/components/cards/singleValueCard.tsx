
import classes from '../styles/cards/singleValueCard.module.css';
import CountUp from "react-countup";


interface Props {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;

}

// Returns a simple card which displays a title and a value and uses countup to animate the value
export default function SingleValueCard({title, value, prefix, suffix}: Props) {
    return (
        <div className={classes.singleValueCard}>
            <h2 className={classes.title}>{title}</h2>
            <h3 className={classes.value}>
                <CountUp end={value} duration={1} separator="," prefix={prefix} suffix={suffix}/>
            </h3>
        </div>
    )
}