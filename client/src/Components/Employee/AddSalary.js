/**import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './attendanceStyle.css';

  //calculation 
calculateAmount = () => {
    let tot = 0;
    let tot2 = 0;
    let percent = 0;
    this.state.attends.map((attends, index) => {
    if (new Date(attends.aTime).toDateString() == new Date().toDateString() && attends.type == "IN") {
        tot = tot + 1
    }
    })
    this.state.employee.map((employee, index) => {
    if (employee.name != "")
        tot2 = tot2 + 1
    })

    percent = (tot / tot2) * 100;

    document.getElementById("cou").innerHTML = tot
    document.getElementById("cou1").innerHTML = tot2 - tot
    document.getElementById("per").innerHTML = percent.toFixed(2) + '%';

}
function addition()
{
        basic = document.getElementById("basicSalary").value;
        otherall = document.getElementById("otherAllowance").value;
        document.getElementById("net").innerHTML = basic * otherall;
}

function divideBy() 
{ 
        num1 = document.getElementById("firstNumber").value;
        num2 = document.getElementById("secondNumber").value;
document.getElementById("result").innerHTML = num1 / num2;
}**/