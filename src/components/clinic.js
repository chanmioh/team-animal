
export function Clinic(props) {
    const takesInsurance = '✔ Takes Insurance'
    const noInsurance = "❌ Doesn't Take Insurance"

    return (<div className="space-y-1 bg-white flex flex flex-col px-10 border-y-2 py-6">
        <div className="font-medium">Clinic Name</div>
        <div>123 Address St.</div>
        <div>(123) 456-7890</div>
        <div>{noInsurance}</div>
        </div>)
}