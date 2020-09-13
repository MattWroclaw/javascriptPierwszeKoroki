let myString = 'Using *, we can work out that that if the two shortest sides of a right-angled triangle have lengths of * and *, the length of the hypotenuse is *.';

let theorem = 'Pythagorean theorem';

let a = 5;
let b = 8;
let c = Math.sqrt(a**2 + b**2);

let templ = `Using ${theorem}, we can work out that that if the two shortest sides of a right-angled triangle have lengths of ${a} and ${b}, the length of the hypotenuse is ${c}.`