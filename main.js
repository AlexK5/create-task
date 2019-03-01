function execute(){
  let p=document.getElementById("code").innerHTML;
  let lines=[];
  let j=0;
  for(let i = 0; i<p.length; i++){
    if(p[i]=="\n"){
      lines.push(p.substring(j,i));
      j=i+1;
    }
  }
  lines.push(p.substring(j,p.length))
  console.log(lines);
}
