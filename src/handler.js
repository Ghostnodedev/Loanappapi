"use strict"

const login = async(req,res)=>{
    const store = []
    const data = req.body
    console.log("data is : ",data)
    for(const user of data){
        const name = user.name
        const password = user.password
        const email = user.email 
        const phone = user.phone
        if(!name || !password||!email ||!phone){
            return{
                status: false,
                message: "Please fill all the fields"
            }
        }
        console.log(name,password,email,phone)
        store.push({ name, password, email, phone, address });
        console.log(store)
    }
    res.send(store)
}
module.exports = login;

const register = async(req,res)=>{
    const reg = []
    console.log("first time reg is : ",reg)
    const data = req.body
    console.log("data is : ",data)
    for(const user of data){
        const name = user.name
        const password = user.password
        const email = user.email 
        const phone = user.phone
        const address = user.address
        const dob = user.dateofbirth
        if(!name || !password||!email ||!phone || !address || !dob){
            return{
                status: false,
                message: "Please fill all the fields"
            }
        }
    console.log(name,password,email,phone,address)
    reg.push({ name, password, email, phone, address, dob });
    console.log(reg)
    }
    res.send(reg)
}
module.exports = register;
