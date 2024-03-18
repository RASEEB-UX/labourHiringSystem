let  pass="fsaqlainmushtaq"
let arr=["*"]
for(let i=0;i<pass.length;i++)
{
 arr.push(pass[i]+"#")
 arr.push("<>")
 
}
console.log(arr.join(""))