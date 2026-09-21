const authAdmin = (req,res, next) => {
    const token = "xyz";
    const isAuthenticated = token === "xyz"
    console.log("Admin is being authenticated")
    if(!isAuthenticated){
        res.status(401).send("Admin is not authenticated")
    } else{
        next()
    }
}

const userAuth = (req,res, next) => {
    const token = "xyz";
    const isAuthenticated = token === "xyz"
    console.log("User is being authenticated")
    if(!isAuthenticated){
        res.status(401).send("User is not authenticated")
    } else{
        next()
    }
}


module.exports = {authAdmin, userAuth }