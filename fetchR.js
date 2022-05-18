export default async function Fetcher(url = "/admin/products/create", data) {
    const token = window.localStorage.getItem('token');

    const respData = await fetch(`http://127.0.0.1:8000/api${url}`, {
        body: data,
        method: 'POST',
        headers: {
            'Content-Type': 'undefined',
            'Authorization': 'Bearer ' + token,
        }
    }).then(r => {
        console.log(r);
        return r.json();
    }).then(r => {
        console.log({ "resss": r });
        res.send(r);
    });
}