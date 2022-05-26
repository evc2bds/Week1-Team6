import React, { useEffect, useState } from 'react';
import MainHeader from "./MainHeader"
import ClassList from "./ClassList"

function ClassDashboard() {
    return(
        <div>
            <MainHeader />
            <h3 style={{fontFamily: "arial", fontSize: 24}}>Class Directory</h3>
            <ClassList />
        </div>
    );
}

export default ClassDashboard