const notFound = (req, res)=>{
    res.status(404).json({
     message : `Not found ${req.originalUrl}`
    })
 }

 export default notFound