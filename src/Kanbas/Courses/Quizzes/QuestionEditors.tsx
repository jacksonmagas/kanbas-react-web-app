import React, { useState } from "react";

function QuestionEditor() {
    return (
        <div>
            <div className="div-flex">
                <input id="question name" className="input-control" />
                <select className="select-control">
                    <option>True/False</option>
                    <option>Multiple Choice</option>
                    <option>Fill in the blank</option>
                </select>
                <s className="fw-bold">pts:</s>
                <input className="input-control flex-end" />
            </div>
            <hr/>

        </div>
    )
}


