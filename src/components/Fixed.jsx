
import { useState } from "react"
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";

export default function Fixed(props) {

    return (
        <div>
            <p className="text-xl font-boldpx-5">{props.title} <span className="text-base font-normal rounded-xl py-2 px-2 bg-slate-600 cursor-pointer">edit</span></p>
            <p>{props.content}</p>
            <p className="font-bold">Monthly Expense: ${Number(props.value).toFixed(2)}</p>
            <p>Start Date: {props.startDate.slice(0, 10)}</p>
            <p>End Date: {props.endDate && props.endDate.slice(0, 10)}</p>
            <br />
        </div>
    )
}