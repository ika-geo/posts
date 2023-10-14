export const createPostIssues = function (req, res) {
    if (!req.body.title){
        res.status(400).json({message: 'Title is missing'})
        return true
    }
    if (!req.body.text){
        res.status(400).json({message: 'Text is missing'})
        return true
    }

}