const bigSliderStateButtons = document.querySelectorAll('.big-slider [type=radio]')

Array.prototype.forEach.call(bigSliderStateButtons, (el)=>{
    el.addEventListener('click', changeBigSliderState, true);
});

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







