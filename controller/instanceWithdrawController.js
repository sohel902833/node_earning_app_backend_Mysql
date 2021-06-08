const {connection}=require('../connection/connection')
const SELECT_INSTANT="SELECT * FROM instantwithdraws"
const SELECT_USERS='SELECT * FROM users'
const SELECT_SETTINGS='SELECT * FROM settings'


const addNewWithDraw=async(req,res,next)=>{
    let {state,coin,time,payment,accountNo} =req.body

    try{
    coin=parseInt(coin);
    if(!coin || !time || !payment || !accountNo || !state){
        res.status(402).json({
            message:"Please Provide All The fields"
        })
    }else{
        let INSERT_WITHDRAW = `INSERT INTO instantwithdraws( \`userId\`, \`time\`, \`payment\`, \`coins\`, \`accountNo\`,\`state\`) VALUES (\'${req.userId}\',\'${time}\',\'${payment}\',\'${coin}\',\'${accountNo}\',\'${state}\')`;
        let result1=await connection.query(INSERT_WITHDRAW)
          res.status(200).json({
              message:"Withdraw Request Sent"
          }) 
    }

    }catch(err){
        res.status(400).json({
            message:err
        })
    }

}
const getWithDraw=async(req,res,next)=>{

    try{
        let withdrawRequests=await connection.query(SELECT_INSTANT);
        res.status(200).json({
           withdrawRequests
       }) 


    }catch(err){
        res.status(400).json({
            message:"Error"
        })
    }

}
const singleUserWithDraw=async(req,res,next)=>{
    try{

        let userId=req.params.id

       const SELECT_SP_WITHDRAW = `SELECT * FROM  instantwithdraws WHERE userId=\'${userId}\'`;
         let withdrawRequests=await connection.query(SELECT_SP_WITHDRAW)
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const userWithDraw=async(req,res,next)=>{
    try{
        let userId=req.userId;

        const SELECT_SP_WITHDRAW = `SELECT * FROM  instantwithdraws WHERE userId=\'${userId}\'`;
        let withdrawRequests=await connection.query(SELECT_SP_WITHDRAW)
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const deleteWithDraw=async(req,res,next)=>{
    try{
        let withdrawId=req.params.withdrawId

        const DELETE_WITHDRAW=`DELETE FROM instantwithdraws WHERE id=${withdrawId}`


        let result=await connection.query(DELETE_WITHDRAW)
        res.status(200).json({
           message:"Successfully Deleted"
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const getActiveOrder=async(req,res,next)=>{
    try{
        const SELECT_PENDING_WITHDRAW = `SELECT * FROM  instantwithdraws WHERE state=\'pending\'`;
        console.log(SELECT_PENDING_WITHDRAW)
        let withdrawRequests=await connection.query(SELECT_PENDING_WITHDRAW);
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const getPaidOrder=async(req,res,next)=>{
    try{
        const SELECT_PAID_WITHDRAW = `SELECT * FROM  instantwithdraws WHERE state=\'paid\'`;
    
        let withdrawRequests=await connection.query(SELECT_PAID_WITHDRAW);
        res.status(200).json({
            withdrawRequests
        }) 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const paidWithdraw=async(req,res,next)=>{
    try{
        const UPDATE_USER = `UPDATE instantwithdraws SET state=\'paid\' WHERE id=${req.params.wId}`;
    
        let withdrawRequests=await connection.query(UPDATE_USER)
        
        res.status(200).json({
            message:"Paid Successful"
        }) 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}



module.exports={
    addNewWithDraw,
    getWithDraw,
    singleUserWithDraw,
    deleteWithDraw,
    getActiveOrder,
    getPaidOrder,
    paidWithdraw,
    userWithDraw
}

