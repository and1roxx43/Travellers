import React from"react";

export default function Footer() {

    return (
        <div>
            <p style={{textAlign: "center", color: "#AC9FC4"}}>Andrew Q {getCurrentDate('-')} &hearts; &copy;</p>
        </div>
    )
}

function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
