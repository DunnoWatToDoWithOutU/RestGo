export async function TagPiece(props : 
{
    image : string,
    type : string
}) 
{
    return (
        <div className="flex flex-col items-center border-l-2 transition duration-300 ease-in-out hover:bg-gray-100">
            <img src={props.image} alt={props.type} className="h-[3vw] w-[auto] max-h-[40px] object-contain my-2 mx-3 sm:mx-5 md:mx-7" />
            <span className="text-[6pt] sm:text-[10pt] md:text-[12pt] text-[#738EC4] font-bold">{props.type}</span>
        </div>
    );
}