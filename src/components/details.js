function createAdditionalOfferingsArr(practiceHub, teleVet, emergencyServices) {
    const offerings = []
    
    if (practiceHub) {
        offerings[offerings.length] = "Participates in PracticeHub"
    }

    if (teleVet) {
        offerings[offerings.length] = "Provides TeleVet Services"
    }

    if (emergencyServices) {
        offerings[offerings.length] = "Provides Emergency Services"
    }

    return offerings;
}

export function Details(props) {
    const takesInsurance = '✔ Takes Insurance'
    const noInsurance = "❌ Doesn't Take Insurance"
    const categories = props.clinic.categories || []
    const specialties = props.clinic.specialties || []
    const offerings = createAdditionalOfferingsArr(props.clinic.practiceHub, props.clinic.televet_services, props.clinic.emergency_services);

    const address = props.clinic.address1 + ' ' + props.clinic.adress2 + ', ' + props.clinic.city + ', ' + props.clinic.state + ' '+ props.clinic.zip

    const gMapLink = 'http://maps.google.com/?ll=' + props.clinic.latitude + ',' + props.clinic.longitude


    return (<div className="text-lg space-y-1 bg-white flex flex flex-col px-10 border-y-2 py-6">
        <div className="text-2xl font-medium">{props.clinic.clinic_name}</div>
        <div><a href={gMapLink} target="_blank">{address}</a></div>
        <div>{props.clinic.phone}</div>
        <div>{props.clinic.accepts_insurance ? takesInsurance : noInsurance}</div>

        
        {categories.length != 0 &&
            <div>Categories:
                {categories.map(category => <div className="rounded-md drop-shadow-md">{category}</div>)}
            </div>
         }
        
        {specialties.length != 0 &&
            <div>Specialties:
                {specialties.map(specialty => <div className="rounded-md drop-shadow-md" >{specialty}</div>)}
            </div>
         }
        
        {specialties.length != 0 &&
            <div>Additional Offerings:
                {offerings.map(offering => <div> ✓ {offering}</div>)}
            </div>
         }
        
        </div>)
}