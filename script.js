//----DOM firing, run script------//
$(document).ready(() => {
    //--Create vars for dice----//

    //--Empty array to store each die---//
    const renderedDice = [ ];
    //---Set a created dice var to 0 --//
    let createdDice = 0;
    //--Set tota dice var to 0 --//
    let diceTotal = 0;

    //--Function that returns random integer that takes max/min arguments --//
    const getRandVal = (max, min) => {
        return Math.floor(Math.random() * (max -min) + min);
    }

    //--Function creates new obj from Die class, adds to gen dice arr, increments by one --//
    const addDice = () => {
        //---Set min to 1 and max to 7---//
        let newRandVal = getRandVal(7, 1);
        let newDieDiv = new Die(newRandVal);
        //--Add to array---//
        renderedDice.push(newDieDiv);
        createdDice += 1;
    }
    //---Func to loop through dice array, call roll method --//
    const diceRoll = () => {
        for (let i  = 0; i  < renderedDice.length; i ++) {
            diceTotal += renderedDice[i].value;
        }
    }
    //---Func that loops through arr, pulls value prop of each obj ---//
    const rollsAdd = () => {
        for (let i  = 0; i  < renderedDice.length; i += 1) {
            diceTotal += renderedDice[i].value;
        }
        //---alert with dice total ---//
        alert(`Your total is ${diceTotal}!`);
        resetDiceTotal();
    }    
    //---Func to reset the diceTotal to 0 ---//
    const resetDiceTotal = () => {
        diceTotal = 0;
    }
    //--Func to reset the rendered dice using reload---//
    const resetRendDice = () => {
        location.reload();
    }
    //--- Click events ---//
    $(`#generatebtn`).click(addDice);
    $(`#rollbtn`).click(diceRoll);
    $(`#getsumbtn`).click(rollsAdd);
    $(`#startoverbtn`).click(resetRendDice);

    //---Die class creator func. Creates die obj with class and id and appends to die container---//
    class Die {
        constructor(value) {
            this.value = value;
            this.id = createdDice;
            this.div = $(`<div></div>`);
            this.div.attr(`id`, this.id);
            this.div.attr(`class`, `die`);
            this.div.append(this.dieFace());
            $(`#diceContainerDiv`).append(this.div);

            //---Click event assigned that calls roll method--//
            this.div.click(()=>{
                this.roll();
            })
            //--Doubleclick event assignment- remove method on index of rendered arr--//
            this.div.dblclick(() => {
                $(`#${this.id}`).remove();
                //---find right index and use splice method --//
                let idx = renderedDice.findIndex(item => item.id === this.id);
                renderedDice.splice(idx, 1);
            })
        }
        //---Roll method- get random func and assigns generated number----//
        roll() {
            this.newValue = getRandVal(7, 1);
            this.value = this.newValue;
            this.div.empty().append(this.dieFace());
        }
        //---Create dieFace method that evals value prop and returns respective image ---//
        dieFace() {
            if(this.value === 1) {
                return $(`<img src="/Users/eric/Documents/Source/FullStackCourse/diceybusiness/images/one.png" />`);
            }
            else if(this.value === 2) {
                return $(`<img src="/Users/eric/Documents/Source/FullStackCourse/diceybusiness/images/two.png" />`);
            }
            else if(this.value === 3) {
                return $(`<img src="/Users/eric/Documents/Source/FullStackCourse/diceybusiness/images/three.png" />`);
            }
            else if(this.value === 4) {
                return $(`<img src="/Users/eric/Documents/Source/FullStackCourse/diceybusiness/images/four.png" />`);
            }
            else if(this.value === 5) {
                return $(`<img src="/Users/eric/Documents/Source/FullStackCourse/diceybusiness/images/five.png" />`);
            }
            else if(this.value === 6) {
                return $(`<img src="/Users/eric/Documents/Source/FullStackCourse/diceybusiness/images/six.png" />`);
            }
        }
    }
})