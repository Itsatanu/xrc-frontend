export default function char1stUP(word){
    let updatedWord=''
    for(let i in word){
        if(i==0) updatedWord+=word[i].toUpperCase()
        else updatedWord+=word[i].toLowerCase()
    }
    return updatedWord
}