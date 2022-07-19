export default async function Login(req, res){
    if (req.method !== 'POST' ) {
        res.status(400).json({msg : 'invalid-method'})
    }

    if ( !req.body) {
        res.status(400).json({msg : 'Values empty'})
    }

    const respData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/login`,{
        body: JSON.stringify(req.body.values),
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        }
    });
    let dataApi = await respData.json();
    res.status(200).json(dataApi);

    
}