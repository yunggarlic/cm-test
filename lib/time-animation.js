import { getTimeStringArray } from "./fetchTime.js";
import { handleCurrentTimeNumberTransitionEnd, handleNextTimeNumberTransitionEnd } from "./handlers.js";

export const cycleTime = (timeArray) => {
    // remove the current numbers that need to be removed
    const timeNumbers = Array.from(document.querySelectorAll(".time-number"));
    timeArray.forEach((time, i) => {
        if (time) {
            timeNumbers[i].classList.add("changing");
        }
    })

    // set the next numbers to the current numbers

    // instantiate a new set of next number divs
}

export const updateClock = (timezone) => {
    // get the number holders and sort them to ensure they are in order
    const timeNumbers = Array.from(document.querySelectorAll(".time-number"));
    timeNumbers.sort((a, b) => a.dataset.timeNumber - b.dataset.timeNumber);

    // get the time that is currently displayed
    const currentTimeElements = timeNumbers.map((timeNumber) => timeNumber.querySelector(".current-number"));
    const currentTimeStringArray = currentTimeElements.map((timeElement) => timeElement.textContent);


    // get the time that will be displayed next and set the text content
    const nextTimeElements = timeNumbers.map((timeNumber) => timeNumber.querySelector(".incoming-number"));
    const nextTimeStringArray = getTimeStringArray(timezone);
    nextTimeElements.forEach((timeNumber, index) => {
        timeNumber.textContent = nextTimeStringArray[index];
    });

    // get the differences between the current time and the next time
    // the differences themselves dont actually matter
    // we only want to transition the time numerals that are changing
    const timeDifferences = currentTimeStringArray.map((time, index) => {
        const difference = Math.abs(Number(time) - Number(nextTimeStringArray[index]));
        return difference > 0 ? difference : null;
    });

    const timeAnimationDto = {
        timeDifferences,
        currentTimeElements,
        nextTimeElements,
    }

    triggerAnimations(timeAnimationDto);

    return nextTimeStringArray;
}

export const triggerAnimations = ({ timeDifferences, currentTimeElements, nextTimeElements }) => {
    timeDifferences.forEach((difference, index) => {
        if (difference != null) {
            currentTimeElements[index].classList.add("changing");
            nextTimeElements[index].classList.add("changing");
        }else{
            currentTimeElements[index].classList.remove("changing");
            nextTimeElements[index].classList.remove("changing");
        }
    })
}

export const promoteNextNumberToCurrent = (timeNumber) => {
    timeNumber.classList.remove("changing")
    timeNumber.classList.replace("incoming-number", "current-number");
    timeNumber.removeEventListener("transitionend", handleNextTimeNumberTransitionEnd);
    timeNumber.addEventListener("transitionend", handleCurrentTimeNumberTransitionEnd);
}

export const createNextTimeElement = () => {
    const nextTimeNumber = document.createElement("div");
    nextTimeNumber.classList.add("incoming-number");
    nextTimeNumber.addEventListener("transitionend", handleNextTimeNumberTransitionEnd);
    return nextTimeNumber;
}