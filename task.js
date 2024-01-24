
const express= require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
port=4000;
let employee=[
    
    {
        id:1,
        Name:'Mano',
        Designation:'Business Analyst',
        age:21,
        phone:9000090009,
        Salary:55000,
        nativeAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        permanentAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        officeName:'TCS',
        officeBranch:'Banglore',
        reportingManager:'Raj',
        currentProjectName:'SchoolMate',
    },
    {
        id:2,
        Name:'Shiva',
        Designation:'Devops Engineer',
        age:21,
        phone:9000090009,
        Salary:60000,
        nativeAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        permanentAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        officeName:'TCS',
        officeBranch:'Hyderabad',
        reportingManager:'Ragav',
        currentProjectName:'SchoolMate',
    },
    {
        id:3,
        Name:'Trinath',
        Designation:'HR',
        age:21,
        phone:9000090009,
        Salary:80000,
        nativeAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        permanentAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        officeName:'HCL',
        officeBranch:'Hyderbad',
        reportingManager:'Ram',
        currentProjectName:'SchoolMate',
    },
    {
        id:4,
        Name:'Shankar',
        Designation:'Tester',
        age:21,
        phone:9000090009,
        Salary:60000,
        nativeAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        permanentAddress:`hNo:1234,11th Street,Pragathi Nagar,Nellore-4`,
        officeName:'TCS',
        officeBranch:'Hyderabad',
        reportingManager:'Ram',
        currentProjectName:'SchoolMate',
    },
];
//1.Getting all employees

app.get('/api/getAllEmployees',(req,res)=>{
    res.json(employee);
    console.log(employee);
});

//2.Adding employee to server

app.post('/api/employee',(req,res)=>{
    const {id,Name,Designation,age,phone,Salary,nativeAddress,permanentAddress,officeName,officeBranch,reportingManager,currentProjectName}=req.body;
    const data={
        id,Name,Designation,age,phone,Salary,nativeAddress,permanentAddress,officeName,officeBranch,reportingManager,currentProjectName
    };
    employee.push(data);
    console.log(employee);
    res.json("Employee Added");

});

//3.Updating details of a specific employee using id

app.put('/api/employee/:id',(req,res)=>{
    const eid=parseInt(req.params.id);
    const employeeDetails=employee.find(item=>item.id==eid);
    console.log(employeeDetails)
    if(employeeDetails)
    {
        employee=employee.map(item=>item.id==eid ? req.body: item);
        res.json("Details Updated");
        console.log(employee);
    }
    else{
        res.status(404).json({errorMessage:'Employee Not Found in Server'});
    }
});

//4.Deleting specified Employee using id 

app.delete('/api/employee/:id',(req,res)=>{
    const eid=parseInt(req.params.id);
    console.log(eid);
    const employeeDetails=employee.find(item=>item.id==eid);
    if(employeeDetails){
        employee=employee.filter(item=>item.id!=eid);
        res.json('Employee deleted');
        console.log(employee);
    }
    else{
        res.status(404).json({errorMessage:'Employee Not Found in Server'});
    }
});

//5.Getting an specified employee using their id

app.get('/api/employee/:id',(req,res)=>{
    const eid=parseInt(req.params.id);
    console.log(eid);
    const employeeDetails=employee.find(item=>item.id==eid);
    if(employeeDetails)
    {
        res.json(employeeDetails);
    }
    else{
        res.status(404).json({errorMessage:'Employee Not Found in Server'})
    }
});

//6.Getting All Employees who are working under a particular manager 

app.get('/api/filterEmployees/reportingManager/:Name',(req,res)=>{
    const rManager=req.params.Name;
    const sortEmployees=employee.filter(item=>item.reportingManager==rManager);
    res.json(sortEmployees);
    console.log(sortEmployees);

});
//7. Getting all employees based on salary (input is salary).
app.get('/api/filterEmployees/:Salary',(req,res)=>{
    const sal=req.params.Salary;
    const sortEmployees=employee.filter(item=>item.Salary==sal);
    res.json(sortEmployees);
    console.log(sortEmployees);

});

//Getting All employees list using Ofc Name 

app.get('/api/filterEmployees/office/:officeName',(req,res)=>{
    const office=req.params.officeName;
    const sortEmployees=employee.filter(item=>item.officeName==office);
    res.json(sortEmployees);
    console.log(sortEmployees);

});

//8.Getting All employees list using Ofc Name and Branch Location.

app.get('/api/filterEmployees/office/:officeName/:officeBranch',(req,res)=>{
    const office=req.params.officeName;
    const branch=req.params.officeBranch;
    const sortEmployees=employee.filter(item=>item.officeName==office && item.officeBranch==branch);
    res.json(sortEmployees);
    console.log(sortEmployees);

});
app.listen(port,()=>{
    console.log(`Server running on port ${port}...`);
});
