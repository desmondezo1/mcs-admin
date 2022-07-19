export default async function addProduct(req, res){
    if (req.method !== 'POST' ) {
        res.status(400).json({msg : 'invalid-method'})
    }

    if ( !req.body) {
        res.status(400).json({msg : 'Values empty'})
    }
    
    
        console.log(typeof(req.body));
    const respData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/admin/products/create`,{
        body: req.body,
        method: 'POST',
        headers: {
            'Content-Type': 'undefined',
            'Authorization': 'Bearer ' + req.query.v,
          }
    }).then(r => {
        console.log(r);
        return r.json()
    }).then(r =>{
        console.log({"resss": r})
        res.send(r)
    });

    

}