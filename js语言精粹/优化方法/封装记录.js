const organization = {name:'acme gooseberries', country: 'gb'}

// end 1
result +=  `<h1>${getOrganization().name}</h1>`
getOrganization().name = newName

// class
class Organization {
    constructor (data) {
        this._name = data.name
        this._country = data.country
    }
    get name () {
        return this._name
    }
    set name (aString) {
        this._name = aString
    }

    get country () {
        return this._country
    }
    set country (aString) {
        this._country = aString
    }
}
const organization = new Organization({name:'acme gooseberries', country: 'gb'})

// 封装变量

function getOrganization () {
    return organization
}




