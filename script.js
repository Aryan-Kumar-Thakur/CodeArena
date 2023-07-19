var response, data;

function convertDateTime(start_time) {
    const dateTime = new Date(start_time);
    
    // Extracting date and time components
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    
    return `${date} | ${time}`;
  }

  function convertDuration(duration) {
    const totalSeconds = parseInt(duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const formattedDuration = `${hours}h ${minutes}m ${seconds}s`;
    return formattedDuration;
  }

function createLinkElement(val) {
    const linkText = "Register here";
    const link = document.createElement("a");
    link.href = val.url;
    link.textContent = linkText;
    link.target = "_blank"
  
    const button = document.createElement("button");
    button.appendChild(link);
  
    const linkContainer = document.createElement("span");
    linkContainer.appendChild(button);
  
    return linkContainer;
  }

const fetchdata = async () => {
    try {
        response = await fetch("https://kontests.net/api/v1/all")
        data = await response.json()
        const relevantdata = data.filter((val)=>{
            return (val.in_24_hours == "Yes")
        })
        const contests = document.getElementById("contest-list")
        console.log(relevantdata)
        if(relevantdata && relevantdata.length > 0){
        var temp = relevantdata.map(val =>{
            const item = document.createElement("li")
            //Creating the link for adding in list
            const linkElement = createLinkElement(val);
            //The innerHTML of list
            item.innerHTML = ("<br>" + 
                              "<span> contest name </span> :- " + val.name + "<br>" +
                               "<span> contest site </span> :- " + val.site + "<br>" +
                               "<span> Start Date and Time </span> :- " + convertDateTime(val.start_time) + "<br>" +
                               "<span> End Date and Time </span> :- " + convertDateTime(val.end_time) + "<br>"+
                               "<span> Duration </span> :- "+ convertDuration(val.duration) + "<br>" +
                               "<span> Link </span> :- " + linkElement.outerHTML + "<br>"
                               )
            contests.appendChild(item)
        })
      }
      else{
        const nodata = document.createElement("h1");
        nodata.innerHTML = "No Contests in next 24 Hours come back Tomorrow"
        contests.style.textAlign = "center"
        contests.appendChild(nodata)
      }
        return relevantdata
    } catch (error) {
        console.log(error);
    }
}
fetchdata()