export default function Balance({value}){
    return <div className="flex">
        <div className="font-bold-text-lg">
            Your Balance
        </div>
        <div className="font-semibold ml-4 text=lg pr-4">
            Rs {value}
        </div>
    </div>
}