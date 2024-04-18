import { TextField } from "@mui/material";
import { useState } from "react";

export function Payment(){

    const [cardNum, setCardNum] = useState<string|null>(null);
    const [expDate, setExpDate] = useState<string|null>(null);
    const [cvv, setCVV] = useState<string|null>(null);
    const [zipCode, setZipCode] = useState<string|null>(null);
    
    return(
        <div className="w-full text-[#15439C] border-[3px] rounded-2xl p-7 relative border-[#15439C] mt-5">
            <p className="absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
                Payment Method
            </p>
            <div className="rounded-md border border-[#15439C] text-center font-bold mx-5 py-1">
                Credit Card
            </div>
            <div className="mt-3 mb-10">
                    <TextField
                        id="cardNumber"
                        label="Card Number"
                        value={cardNum}
                        onChange={(e) => setCardNum(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />

                    <TextField
                        id="expirationDate"
                        label="Expiration Date"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        variant="outlined"
                        className="w-[50%]"
                    />

                    <TextField
                        id="cvv"
                        label="CVV"
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                        variant="outlined"
                        className="w-[50%]"
                    />

                    <TextField
                        id="zipCode"
                        label="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
            </div>

            
            <button className="absolute right-5 bottom-2 bg-[#2465E2] text-white font-bold rounded-md px-5 py-2 mt-5">
              Show QR Code
            </button>
        </div>
    );
}

