
// console.log(module);
module.exports = {getDate, getDay};

function getDate(){
    const today = new Date();
    const  options = {
        weekday: "long",
        day: 'numeric',
        month: 'long',
    }

    const day = today.toLocaleDateString('en-US', options);
    return day;
}

function getDay(){
    const today = new Date();
    const options = {
        weekday: "long",
    };

   return today.toLocaleDateString('en-US', options);
}

