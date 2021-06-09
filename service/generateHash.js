function generateHash(){
    let items = ['a', 'sd', '8', '12', '1', '9', 'v', 'f', 'z', 'b', 'y', '9', 'dz'];
    let hash = '';
    for(let i = 0; i < items.length; i++){
        hash += items[Math.floor(Math.random() * items.length)];
    }

    return hash;
}

module.exports = { generateHash };