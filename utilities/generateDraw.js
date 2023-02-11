data = [
    {
        "_id": "63e71d2c2b3c0d1857d43d9b",
        "name": "Rafael",
        "email": "rafollo@live.com",
        "__v": 0
    },
    {
        "_id": "63e79859e4984c3f643948f6",
        "name": "Rafael Silva",
        "email": "vrafagamer@gmail.com",
        "__v": 0
    },
    {
        "_id": "63e79859e4984c3f643948f6",
        "name": "Fulano",
        "email": "email@host.com",
        "__v": 0
    }
]

function generateDraw(data) {
    if (hasDuplicates(data)) throw Error('Duplicate')

    let sorted_data = [...data].sort(() => 0.5 - Math.random()) // randomly sorted original array
    
    return data.reduce((acc, person) => {

        let gifted = sorted_data.filter(g => g !== person)[0] // gets first different person

        sorted_data.splice(sorted_data.findIndex(i => i == gifted), 1)

        acc.push({"name": person.name, "email": person.email, "gifted_name": gifted.name, "gifted_email": gifted.email})

        return acc
    }, [])
}

const hasDuplicates = arr => new Set(arr).size != arr.length


module.exports = generateDraw