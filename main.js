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
      do{
        let maxLength = 0;
        for(let item of list){
          if(item.length>maxLength && !(items.includes(item))){
            maxLength=item.length;
          }
        }
        for(let item of list){
          if(item.length==maxLength && !(items.includes(item))){
            items.push(item)
          }
        }
      } while(maxLength>0);
    }
    for(let item of items){
      items2.push(list2[list.indexOf(item)]);
    }
    return([items,items2])
  }
  function simplify(expression){
    let code = expression;
    let done = 0;
    while(done==0){
      done=1;
      try{
        code = eval(code);
      }catch(err){
        console.log(code)
        done=0;
        for(let variable of variables){
          while(code.includes(variable)){
            code = `${code.substring(0,code.search(variable))}${values[variables.indexOf(variable)]}${code.substring(code.search(variable)+variable.length,code.length)}`
          }
        }
        if(code[0]=='"' && code[code.length-1]=='"'){
          done=1;
          code=code.substring(1,code.length-1);
        }
      }
    }
    return(code);
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
        values[variables.indexOf(lines[j].substring(0,lines[j].search("&lt;--")))]=lines[j].substring(simplify(lines[j].search("&lt;--")+6,lines[j].length));
      }else{
        variables.push(lines[j].substring(0,lines[j].search("&lt;--")));
        values.push(simplify(lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length)));
        let container=lengthSort(variables,values);
        variables=container[0];
        values=container[1];
      }
    }
    if(lines[j].search("DISPLAY")==0 && lines[j][lines[j].length-1]==")" && lines[j][7]=="("){
      document.getElementById("output").innerHTML+=`<br/>${simplify(lines[j].substring(8,lines[j][lines[j].length-1]))}`;
    }
  }
  console.log(variables);
}
