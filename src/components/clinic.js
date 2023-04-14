import Case from 'case'

export default function Clinic({ clinic }) {
  const takesInsurance = "✔️ takes insurance";
  const noInsurance = "❌ doesn't take insurance";

  const addressArr = [clinic.address1, clinic.adress2, clinic.city, clinic.state].filter(word => word.length != 0)
  const address = '🗺️ ' + addressArr.join(', ') + ' '+ clinic.zip
  
  
  const phoneNum = clinic.phone
  let phoneNumDisplay = phoneNum ? "📞 (" + phoneNum.substring(0, 3) + ")" + " " + phoneNum.substring(3, 6) + "-" + phoneNum.substring(6) : "📞 Unknown"
  
  return (
    <div className="border-b-2 space-y-1 px-8 py-6 text-left">
      <div className="font-bold">{clinic.clinic_name}</div>
      <div className="subtitle">
        <div>{address}</div>
        <div>{phoneNumDisplay}</div>
        {clinic.accepts_insurance ?
            <div className="text-green-600">{takesInsurance}</div> : <div className='text-rose-600'> {noInsurance} </div>}
        

        <div className='flex space-x-1'>
            <div>🚶 XXmin</div> 
            <div>🚉 XXmin</div>
            <div>🚗 XXmin</div>
        </div>
    </div>
      
    </div>
  );
}
