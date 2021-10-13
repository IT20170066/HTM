var apit_choice = new Array();
apit_choice["Yes"]=20;
apit_choice["No"]=0;

function getBasicSalary()
{
    var BasicSalary = getBasicSalary() * 0.08;
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}

function getOtherAllowance()
{
    var EpfDeduction = getBasicSalary() * 0.08;
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}

function getNetSalary()
{
    var NetSalary = salary + otherAllowances;
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}

function getEpfDeduction()
{
    var EpfDeduction = getBasicSalary() * 0.08;
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}

function getEpfContribution()
{
    var EpfContribution = getBasicSalary() * 0.12;
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}

function getEtfContribution()
{
    var EtfContribution = getBasicSalary() * 0.03;
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}

function monthlySalary()
{
    var monthlySalary = getnetSalary() - getApit() - getEpfDeduction();
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price For the Cake $"+cakePrice;

}