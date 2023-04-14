import { PhoneIcon } from "@heroicons/react/24/solid";
import { MapIcon } from "@heroicons/react/24/solid";
export function Details(props) {
    const takesInsurance = '✔️ Takes Insurance'
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

    const addressArr = [props.clinic.address1, props.clinic.adress2, props.clinic.city, props.clinic.state].filter(word => word.length != 0)
    const fullAddress = addressArr.join(', ') + ' '+ props.clinic.zip

    const gMapLink = 'https://www.google.com/maps/dir//' + props.clinic.clinic_name + fullAddress

    const phoneNum = props.clinic.phone
    let phoneNumDisplay = phoneNum ? "📞 (" + phoneNum.substring(0, 3) + ")" + " " + phoneNum.substring(3, 6) + "-" + phoneNum.substring(6) : "📞 Unknown"

    const phoneNumLink = "tel:+" + phoneNum

    const haveTimeData = props.clinic.walkTime ? true : false;

    const openDirections = () => {
        window.open(gMapLink, "_blank")
    }

    const callPhoneNum = () => {
        window.open(phoneNumLink)
    }
    

    return (<div className="text-lg space-y-1 bg-white flex flex-col py-6">
        <div> 
            <div className="text-2xl font-bold pb-8">{props.clinic.clinic_name}</div>

            <div className="flex py-4 border-y-2 justify-center space-x-4">
                
                {props.clinic.phone && <button className="btn btn-circle btn-outline btn-primary" role="link" onClick={() => callPhoneNum()}><PhoneIcon className="h-6"/></button>}
                {props.clinic.address1 && <button className="btn btn-circle btn-outline btn-primary" role="link" onClick={() => openDirections()}><MapIcon className="h-6"/></button>}
            </div>
            
            <div className="py-8">
                <div className="capitalize">🗺️ {fullAddress}</div>
                <div>{phoneNumDisplay}</div>
                <div>{props.clinic.accepts_insurance ? takesInsurance : noInsurance}</div>
            </div>
        </div>
        
        {haveTimeData && <div className="flex flex-col py-8 border-t-2">
            <div>{props.clinic.walkTime} minute walk 🚶</div> 
            <div>{props.clinic.transitTime} minute transit time 🚉</div>
            <div>{props.clinic.drivingTime} minute drive 🚗</div>
            </div>}

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