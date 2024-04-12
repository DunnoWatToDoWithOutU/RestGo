export async function TagPiece(props : 
{
    image : string,
    type : string
}) 
{
    return (
        <div className="flex flex-col items-center">
            <img src={props.image} alt={props.type} className="h-[40%] w-[auto] mb-1 object-contain" />
            <span className="text-[10pt] text-[#738EC4] font-bold">{props.type}</span>
        </div>
    );
}