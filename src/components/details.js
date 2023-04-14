export function Details(props) {
    const takesInsurance = '✔ Takes Insurance'
    const noInsurance = "❌ Doesn't Take Insurance"
    const categories = props.clinic.categories || []
    const specialties = props.clinic.specialties || []
    const offerings = [
        (props.clinic.practiceHub ? ["Participates in PracticeHub"] : []),
        (props.clinic.televet_services ? ["Provides TeleVet Services"] : []), 
        (props.clinic.emergency_services? ["Provides Emergency Services"] : [])].filter(word => word.length != 0);

    const address = props.clinic.address1 + (props.clinic.adress2 ? " " + props.clinic.adress2 : "") + ", "
    const fullAddress = address + props.clinic.city + ', ' + props.clinic.state + ' '+ props.clinic.zip

    const gMapLink = 'http://maps.google.com/?q=' + fullAddress

    const phoneNum = props.clinic.phone
    let phoneNumDisplay = phoneNum ? "(" + phoneNum.substring(0, 3) + ")" + " " + phoneNum.substring(3, 6) + "-" + phoneNum.substring(6) : "📞 Unknown"

    const phoneNumLink = "tel:+" + phoneNum
    return (<div className="text-lg space-y-1 bg-white flex flex flex-col px-10 border-y-2 py-6">
        <div className="mb-3"> 
            <div className="text-2xl font-medium">{props.clinic.clinic_name}</div>
            <div><a href={gMapLink} target="_blank">🗺️</a> {fullAddress}</div>
            <div><a href={phoneNumLink} >📞</a>  {phoneNumDisplay}</div>
            <div>{props.clinic.accepts_insurance ? takesInsurance : noInsurance}</div>
        </div>
        

        
        {categories.length != 0 &&
            <div>
                <div className="font-medium"> Categories:</div>
                {categories.map(category => <div className="rounded-md drop-shadow-md">{category}</div>)}
            </div>
         }
        
        {specialties.length != 0 &&
            <div>
                <div className="font-medium">Specialties:</div>
                {specialties.map(specialty => <div className="rounded-md drop-shadow-md" >{specialty}</div>)}
            </div>
         }

        {offerings.length != 0 &&
            <div className="pt-3 border-t-2">
                <div className="font-medium">Additional Offerings: </div>
                {offerings.map(offering => <div> ✓ {offering}</div>)}
            </div>
         }
        
        </div>)
}