export default async function qrcodegenerate(bookingID: string) {
  fetch("http://localhost:3000/api/v2/qrcodegenerate/convert-to-qrcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      url: `http://localhost:3000/mybooking/${bookingID}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
