export function Details(props) {
    const takesInsurance = '✔ Takes Insurance'
    const noInsurance = "❌ Doesn't Take Insurance"

    return (<div className="text-lg space-y-1 bg-white flex flex flex-col px-10 border-y-2 py-6">
        <div className="text-2xl font-medium">Clinic Name</div>
        <div>123 Address St.</div>
        <div>(123) 456-7890</div>
        <div>{noInsurance}</div>
        <div>Categories: </div>
        <div>Specialties: </div>
        <div>Additional Offerings: </div>
        </div>)
}