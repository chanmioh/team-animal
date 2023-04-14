export function Details(props) {
    const takesInsurance = '✔ Takes Insurance'
    const noInsurance = "❌ Doesn't Take Insurance"

    const categories = [
        (props.clinic.Avian ? ["Bird"] : []),
        (props.clinic["Beef Cattle"] ? ["Beef Cattle"] : []),
        (props.clinic["Canine and Feline"] ? ["Cat & Dog"] : []),
        (props.clinic.Dairy ? ["Dairy Cattle"] : []),
        (props.clinic.Equine ? ["Horse"] : []),
        (props.clinic.Exotic ? ["Exotic"] : []),
        (props.clinic["Food Animal"] ? ["Food Animal"] : []),
        (props.clinic["Reptile and Amphibian"] ? ["Reptiles & Amphibians"] : []),
        (props.clinic.Swine ? ["Pig"] : [])].filter(word => word.length != 0)
    
    const specialties = [
        (props.clinic.Cardiology? ["Cardiology"]: []),
        (props.clinic.Dermatology? ["Dermatology"]: []),
        (props.clinic.Neurology? ["Neurology"]: []),
        (props.clinic.Nutrition? ["Nutrition"]: []),
        (props.clinic.Oncology? ["Oncology"]: []),
        (props.clinic.Radiology? ["Radiology"]: [])].filter(word => word.length != 0)

    const offerings = [
        (props.clinic.practiceHub ? ["Participates in PracticeHub"] : []),
        (props.clinic.televet_services ? ["Provides TeleVet Services"] : []), 
        (props.clinic.emergency_services? ["Provides Emergency Services"] : [])].filter(word => word.length != 0)

    const address = props.clinic.address1 + (props.clinic.adress2 ? " " + props.clinic.adress2 : "") + ", "
    const fullAddress = address + props.clinic.city + ', ' + props.clinic.state + ' '+ props.clinic.zip

    const gMapLink = 'http://maps.google.com/?q=' + fullAddress

    const phoneNum = props.clinic.phone
    let phoneNumDisplay = phoneNum ? "(" + phoneNum.substring(0, 3) + ")" + " " + phoneNum.substring(3, 6) + "-" + phoneNum.substring(6) : "📞 Unknown"

    const phoneNumLink = "tel:+" + phoneNum
    return (<div className="text-lg space-y-1 bg-white flex flex-col py-6">
        <div className="pb-8"> 
            <div className="text-2xl font-bold pb-4">{props.clinic.clinic_name}</div>
            <div className="capitalize"><a href={gMapLink} target="_blank">🗺️</a> {fullAddress}</div>
            <div><a href={phoneNumLink} >📞</a>  {phoneNumDisplay}</div>
            <div>{props.clinic.accepts_insurance ? takesInsurance : noInsurance}</div>
        </div>
        
        {categories.length != 0 &&
            <div className="py-8 border-t-2">
                <div className="font-bold pb-4"> Animal Categories</div>
                {categories.map(category => <div>✓ {category}</div>)}
            </div>
         }
        
        {specialties.length != 0 &&
            <div className="py-8 border-t-2 ">
                <div className="font-bold pb-4">Specialties</div>
                {specialties.map(specialty => <div>✓ {specialty}</div>)}
            </div>
         }

        {offerings.length != 0 &&
            <div className="pt-8 border-t-2">
                <div className="font-bold pb-4">Additional Offerings</div>
                {offerings.map(offering => <div>✓ {offering}</div>)}
            </div>
         }
        
        </div>)
}