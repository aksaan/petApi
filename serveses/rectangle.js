class Rectangle {
    constructor(a, b){
        this.a = a;
        this.b = b;
    }
    s() {
        return this.a * this.b
    }
    p() {
        return (this.a + this.b) * 2
    }
}
class Square extends Rectangle {
    constructor(a){
        super(a, a)
    }
}
let a = new Square(2);
console.log(a.s());
console.log(a.p());