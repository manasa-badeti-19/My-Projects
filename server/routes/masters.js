const express = require('express');
const router = express.Router();
const pool = require('../db');

//insert single record to departments table
router.post('/departments',async(req,res)=>{
    try{
        const {id,name} = req.body;
       
        const result = await pool.query(
            'INSERT INTO departments (id, name) VALUES ($1, $2) RETURNING *',
            [id,name]
        );
        
        res.status(200).json(result.rows[0])
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Insert Failed'});
    }
    
});

//add departments in bulk
router.post('/departments/bulk',async(req,res)=>{
    try{
        const departments = req.body;
        console.log("req:",req.body);
        const values = departments.map(d => `('${d.id}', '${d.name}')`).join(',');
        const query =`INSERT INTO departments (id, name) VALUES ${values} RETURNING *`;
        const result = await pool.query(query);

        
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Insert Failed'});
    }
    
});

//add designations in bulk
router.post('/designations/bulk',async(req,res)=>{
    try{
        const departments = req.body;
        console.log("req:",req.body);
        const values = departments.map(d => `('${d.id}', '${d.name}', '${d.department_id}')`).join(',');
        const query =`INSERT INTO designations (id, name, department_id) VALUES ${values} RETURNING *`;
        const result = await pool.query(query);

        
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Insert Failed'});
    }
    
});

//GET Departments
router.get('/departments', async(req,res)=>{
    try{
        const allDepartments = await pool.query("SELECT * FROM departments");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:allDepartments.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

//GET Designations
router.get('/designations',async(req,res)=>{
    try{

        const {department} = req.query;
        const query = `
            SELECT d.id,d.name FROM designations d
            JOIN departments dp ON d.department_id = dp.id
            WHERE dp.id= $1   
            `;
        const values =[department]
        const result = await pool.query(query,values);
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
   
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/employment-types',async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM employment_types");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/roles',async(req,res)=>{
        try{
        const result = await pool.query("SELECT * FROM roles");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/shifts',async(req,res)=>{
        try{
        const result = await pool.query("SELECT * FROM shifts");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/locations',async(req,res)=>{
       try{
        const result = await pool.query("SELECT * FROM locations");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/countries',async(req,res)=>{
        try{
        const result = await pool.query("SELECT * FROM countries");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/states',async(req,res)=>{
    try{
    const {country} = req.query;
        const query = `
            SELECT d.id,d.name FROM states d
            JOIN countries dp ON d.country_id = dp.id
            WHERE dp.id= $1    
            `;
        const values =[country]
        const result = await pool.query(query,values);
   res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
     catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/banks',async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM banks");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/gender',async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM gender");
     
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/cities',async(req,res)=>{
    try{
    const {state} = req.query;
        const query = `
            SELECT d.id,d.name FROM cities d
            JOIN states dp ON d.state_id = dp.id
            WHERE dp.id= $1  
            `;
        const values =[state]
        const result = await pool.query(query,values);
   res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
    }
     catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});

router.get('/reporting-manager',async(req,res)=>{
    try{

        const {department} = req.query;
        const query = `
            SELECT d.id,d.name FROM reporting_managers d
            JOIN departments dp ON d.department_id = dp.id
            WHERE dp.id= $1    
            `;
        const values =[department]
        const result = await pool.query(query,values);
    res.status(200).json({status:'SUCCESS',message:'Fetched successfully',data:result.rows})
   
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Get Failed'});
    }
});


module.exports = router;