import React from "react";

const FormattedDate = ({date}) => {
    //format date to be more readable
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
    const formattedTime = dateObj.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", hour12: true});
    const formattedDateTime = `${formattedDate} at ${formattedTime}`;


    return (
        <div>
            <p>{formattedDateTime}</p>
        </div>    
        );
}

export default FormattedDate;