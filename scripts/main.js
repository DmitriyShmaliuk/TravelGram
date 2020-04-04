const bigSliderStateButtons = document.querySelectorAll('.big-slider [type=radio]');
const navigationSection = document.querySelector('footer .navigation');
const mapOptions = {
    coordinates: {
        lat: 50.254650,
        lng: 28.658667
    },
    zoom: 13,
};

loadMaps()
    .then(()=>initMap(mapOptions))
    .catch((error)=>{
        console.log(error);
    });

Array.prototype.forEach.call(bigSliderStateButtons, (el)=>{
    el.addEventListener('click', changeBigSliderState, true);
});

navigationSection.addEventListener('click', clickNavagiationSectionHandler, true);

function changeBigSliderState ({currentTarget}){
    const objectClasses = ['active-first','active-second','active-third','active-fourth','active-fifth'];
    const sliderContent = document.querySelector('.big-slider .slider-content');
    const currentClass = searchClass(objectClasses, sliderContent.classList);

    if (currentClass){
        setNewClass(currentClass, sliderContent, currentTarget.id);
    }
}

function searchClass (classes, objectClasses){
    let  currentClass = null;

    classes.some((el1)=>{
        const result = Array.prototype.find.call(objectClasses, (el2)=> el2 === el1);
        if (result){
            currentClass = result;
            return true;
        }

        return false;
    });

    return currentClass;
}

function setNewClass (currentClass, sliderContent, id){
    const sliderClasses = {
        firstState: 'active-first',
        secondState: 'active-second',
        thirdState: 'active-third',
        fourthState: 'active-fourth',
        fifthState: 'active-fifth'
    };

    sliderContent.classList.remove(currentClass);
    sliderContent.classList.add(sliderClasses[id]);
}

function loadMaps(){
    return new Promise((resolve, reject)=>{
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqKlMjrbp7YV-Q_MfSbmu336Rg1HjnJUo&callback=initMap';
        document.body.append(script);

        script.onload = () => resolve();
        script.onerror = () => reject(new Error (`Script can not ${script.src} be connected!!!`));
    });
}

function initMap(options) {
    const map = new google.maps.Map(document.getElementsByClassName("map")[0], options);
    showCurrentLocation(map);
}

function showCurrentLocation(map){
    if (navigator.geolocation) {
        const infoWindow = new google.maps.InfoWindow;

        navigator.geolocation.getCurrentPosition(position => successGetLocation(map, position),
           () => errorGetLocation(map, infoWindow));
    }
    else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function successGetLocation (map, position) {
    const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    createMarker(map, currentPosition, "Your current position");
    map.setCenter(currentPosition);
}

function errorGetLocation(map, infoWindow){
    handleLocationError(true, infoWindow, map.getCenter());
}

function createMarker(map, position, title){
    return new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        position,
        map,
        title
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function clickNavagiationSectionHandler({currentTarget}){
    const {classList} = currentTarget;
    const active  = Array.prototype.indexOf.call(classList, 'active') === -1;
    active ? classList.add('active') : classList.remove('active');
}