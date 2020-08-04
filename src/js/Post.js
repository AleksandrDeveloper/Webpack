export default class Post {
    constructor(title) {
        this.title = title
        this.date = new Date()
    }
    print() {
        return `titlde--${this.title} | da66e---${JSON.stringify(this.date)} ...`;
    }
}   