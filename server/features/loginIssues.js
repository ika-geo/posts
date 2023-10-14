export const loginIssues = function (req, res){
    if (!req.body.email){
        res.status(400).json({message: 'Email is missing'})
        return true
    }
    if (!req.body.password){
        res.status(400).json({message: 'Password is missing'})
        return true
    }
}