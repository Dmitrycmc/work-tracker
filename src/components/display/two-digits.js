import { format } from "../../utils/time-utils";
import React, {Fragment} from "react";

const Digit = ({value}) => (
    <span className="digit">{value}</span>
);

const TwoDigits = ({value}) => {
    const str = format(value);
    return (
        <Fragment>
            <Digit value={str[0]}/>
            <Digit value={str[1]}/>
        </Fragment>
    );
};

export default TwoDigits;