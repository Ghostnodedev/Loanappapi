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
    console.log(name,password,email,phone,address)
    reg.push({ name, password, email, phone, address, dob });
    console.log(reg)
    }
    res.send(reg)
}
module.exports = register;
