function generateDraw(data) {

    let sorted_data = [...data].sort(() => 0.5 - Math.random()) // randomly sorted original array
    
    return data.reduce((acc, person) => {

        let gifted = sorted_data.filter(g => g !== person)[0] // gets first different person

        sorted_data.splice(sorted_data.findIndex(i => i == gifted), 1)

        acc.push({"name": person.name, "email": person.email, "gifted_name": gifted.name, "gifted_email": gifted.email})

        return acc
    }, [])
}

module.exports = generateDraw