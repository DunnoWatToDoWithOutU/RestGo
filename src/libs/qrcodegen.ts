export default async function qrcodegenerate(bookingID: string){
    fetch('https://rest-go.vercel.app/api/v2/qrcodegenerate/convert-to-qrcode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ url: `https://rest-go.vercel.app/mybooking/${bookingID}` }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
    
}