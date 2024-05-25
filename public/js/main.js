const submitBtn=document.getElementById('submit-btn');
const cityInputName=document.getElementById('cityInputName');
const cityName=document.getElementById('cityName');
// temperature info
const temp=document.getElementById('temp');
const temp_status=document.getElementById('temp_status');
const API_key="fe57da0007b6985c11894c61b16c2783";
const dataHide=document.querySelector('.middle-layer')
 const temp_celsius=document.getElementById('temp_celsius');
// const getAlert=()=>{
//     alert("helolo");
// }

// submitBtn.addEventListener('click',getAlert)
const getInfo= async(event)=>{
    event.preventDefault();
   
    let cityValue=cityInputName.value;
    // if search bar is empty
    if(cityValue==="")
    {
        cityName.innerText="please input any city name";
        dataHide.classList.add('data-hide');
    }
    else{
        try
        {   
          
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_key}`;
            const response= await fetch(url);
            const data=await response.json();
            console.log(data);
           
            const arrData=[data];
            const fahrenheitTemp = arrData[0].main.temp;
            const celsiusTemp = (fahrenheitTemp - 32) / 1.8;
            const roundedCelsiusTemp = celsiusTemp.toFixed(2);
           

            temp.innerText = roundedCelsiusTemp;
           
            cityName.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
            // condition to check sunny or cloudy
            const tempMood=arrData[0].weather[0].main;
            if(tempMood=="Clear"){
            temp_status.innerHTML=
                `<i class="fa-regular fa-sun fa-lg" style="color: #FFD43B;"></i>`;
            }
            else if(tempMood=='Clouds')
            {
                temp_status.innerHTML=
                `<i class="fa-solid fa-cloud fa-lg" style="color: #74C0FC;"></i>`;
            }
            else if(tempMood=='Rain')
            {
                temp_status.innerHTML=
                `<i class="fa-solid fa-cloud-rain fa-lg" style="color: #74C0FC;"></i>`;
            }
            else 
            {
                temp_status.innerHTML=
                `<i class="fa-solid fa-cloud fa-lg" style="color: #74C0FC;"></i>`;
            }
            
            dataHide.classList.remove('data-hide');
           
            
        }catch(e){
            cityName.innerText=`please input valid city name`;
            dataHide.classList.add('data-hide');
        }
      
    }
   
}
submitBtn.addEventListener('click',getInfo)
