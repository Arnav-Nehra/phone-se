export function InputBox({label,placeholder,onChange}){
    return <div>
        <div>
        <div className="text-base font-medium text-white text-left py-2">{label}</div>
    </div>
    <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div> 
}