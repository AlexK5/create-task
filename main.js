function execute(){
  let variables = [];
  let values = [];
  function eliminateSpaces(row){
    let line = row;
    let i = 0;
    while(i < line.length){
      if(line[i]==" "){
        line=`${line.substring(0,i)}${line.substring(i+1,line.length)}`;
      }else{
        i++;
      }
    }
    return(line);
  }
  function lengthSort(list,list2){
    let items = [];
    let items2 = [];
    while(items.length<list.length){
      let maxLength = 0;
      for(let item of list){
        if(item.length>maxLength && !(items.includes(item))){
          maxLength=item.length;
        }
      }
      for(let item of list){
        if(item.length==maxLength && !(items.includes(item))){
          items.push(item)
          items2.push(list2[list.indexOf(item)])
        }
      }
    }
    return([items,items2])
  }
  function simplify(expression){
    let code = expression;
    try{
      code = eval(expression);
    }catch(err){
      for(let variable of variables){
        while(code.includes(variable)){

        }
      }
    }
  }
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
  for(let j = 0; j<lines.length; j++){
    lines[j] = eliminateSpaces(lines[j]);
  }
  for(let j = 0; j<lines.length; j++){
    if(lines[j].includes("&lt;--")){
      if(variables.includes(lines[j].substring(0,lines[j].search("&lt;--")))){
        values[variables.indexOf(lines[j].substring(0,lines[j].search("&lt;--")))]=lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length);
      }else{
        variables.push(lines[j].substring(0,lines[j].search("&lt;--")));
        values.push(lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length));
        variables=lengthSort(variables,values)[0];
        values=lengthSort(variables,values)[1];
      }
    }
  }
  console.log(values)
}
