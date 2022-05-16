export default async function addProduct(req, res){
    if (req.method !== 'POST' ) {
        res.status(400).json({msg : 'invalid-method'})
    }

    if ( !req.body) {
        res.status(400).json({msg : 'Values empty'})
    }

    const token = localStorage.getItem('token');

    const respData = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/create`,{
        body: JSON.stringify(req.body.values),
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        }
    });
    let dataApi = await respData.json();
    res.status(200).json(dataApi);

    
}