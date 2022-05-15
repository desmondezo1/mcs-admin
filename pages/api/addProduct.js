export default async function login(req, res) {
    if(!req.body){
        res.status(400).json({msg: 'empty payload'})
    }
    const response = await fetch(process.env.BACKEND_API_BASE_URL + "/",{
        method: "POST",
        body: req.body
    });

    res.status(200).json( response );
}