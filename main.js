function execute(){
  document.getElementById("output").innerHTML="";
  let variables = [];
  let values = [];
  let lists = [];
  function eliminateSpaces(row){
    let line = row;
    let i = 0;
    while(i < line.length){
      if(line[i]==" " && !(line.substring(0,line.search(" ")).includes('"') && line.substring(line.search(" ")+1,line.length).includes('"'))){
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
  function manualSearch(expression,words){
    for(let i = 0; i<expression.length; i++){
      if(expression.substring(i,i+words.length)==words){
        return(i);
      }
    }
    return(-1);
  }
  function simplify(expression){
    let code = expression;
    let done = 0;
    iters=0;
    while(done==0 && iters<100){
      //iters++;
      done=1;
      try{
        code = eval(code);
      }catch(err){
        done=0;
        randomDone=0;
        while(randomDone==0){
          randomDone=1;
          if(code.includes("RANDOM") && code[code.search("RANDOM")+6]=="(" && manualSearch(code.substring(code.search("RANDOM")+7,code.length),")")!=-1 && !(code.substring(0,code.search("RANDOM")).includes('"')) && !(code.substring(code.search("RANDOM")+7,code.length-1).includes('"'))){
            let minimum = Number(code.substring(code.search("RANDOM")+7,code.search("RANDOM")+7+code.substring(code.search("RANDOM")+7,code.length).search(",")))
            let maximum = Number(code.substring(code.search("RANDOM")+7+code.substring(code.search("RANDOM")+7,code.length).search(",")+1,code.search("RANDOM")+7+manualSearch(code.substring(code.search("RANDOM")+7,code.length),")")))
            let num = Math.floor(Math.random()*(maximum-minimum+1)+minimum)
            code=`${code.substring(0,code.search("RANDOM"))}${num}${code.substring(code.search("RANDOM")+7+manualSearch(code.substring(code.search("RANDOM")+7,code.length),")")+1,code.length)}`
          }
          if(code.includes("RANDOM") && code[code.search("RANDOM")+6]=="(" && manualSearch(code.substring(code.search("RANDOM")+7,code.length),")")!=-1 && !(code.substring(0,code.search("RANDOM")).includes('"')) && !(code.substring(code.search("RANDOM")+7,code.length-1).includes('"'))){
            randomDone=0;
          }
        }
        inputDone=0;
        while(inputDone==0){
          inputDone=1;
          if(code.includes("INPUT()") && !(code.substring(0,code.search("INPUT")).includes('"')) && !(code.substring(code.search("INPUT")+6,code.length-1).includes('"'))){
            let answer = prompt("Enter a value:");
            if(isNaN(answer)){
              answer='"'+answer+'"';
            }
            code=`${code.substring(0,code.search("INPUT()"))}${answer}${code.substring(code.search("INPUT()")+7,code.length)}`
          }
          if(code.includes("INPUT()") && !(code.substring(0,code.search("INPUT")).includes('"')) && !(code.substring(code.search("INPUT")+6,code.length-1).includes('"'))){
            inputDone=0;
          }
        }
        if(code.includes("MOD")){
          modDone=0;
          while(modDone==0){
            modDone=1;
            if(code.includes("MOD") && !(code.substring(0,code.search("MOD")).includes('"')) && !(code.substring(code.search("MOD")+3,code.length-1).includes('"'))){
              code=`${code.substring(0,code.search("MOD"))}%${code.substring(code.search("MOD")+3,code.length)}`
            }
            if(code.includes("MOD") && !(code.substring(0,code.search("MOD")).includes('"')) && !(code.substring(code.search("MOD")+4,code.length-1).includes('"'))){
              modDone=0;
            }
          }
        }
        for(let variable of variables){
          while(code.includes(variable)){
            if(typeof(values[variables.indexOf(variable)])=="string" && (values[variables.indexOf(variable)][0]!='"' || values[variables.indexOf(variable)][values[variables.indexOf(variable)].length]!='"')){
              code = `${code.substring(0,code.search(variable))}"${values[variables.indexOf(variable)]}"${code.substring(code.search(variable)+variable.length,code.length)}`
            }else{
              code = `${code.substring(0,code.search(variable))}${values[variables.indexOf(variable)]}${code.substring(manualSearch(code,variable)+variable.length,code.length)}`
            }
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
  function makeList(){
    let listString=`,${lines[j].substring(lines[j].search("&lt;--")+7,lines[j].length-1)}`;
    let listItems=[];
    let quoteCount=0;
    let parenthesesCount=0;
    let varsMade=[];
    let valuesMade=[];
    for(let i = 0; i<listString.length;i++){
      if(listString[i]=='"'){
        quoteCount++;
      }
      if(listString[i]=="("){
        parenthesesCount++;
      }
      if(listString[i]==")"){
        parenthesesCount--;
      }
      if(listString[i]=="," && quoteCount%2==0 && parenthesesCount==0){
        listItems.push("");
      }else{
        listItems[listItems.length-1]=`${listItems[listItems.length-1]}${listString[i]}`
      }
    }
    let varName=lines[j].substring(0,lines[j].search("&lt;--"));
    for(let i = 0; i<listItems.length;i++){
      varsMade.push(`${varName}[${i+1}]`)
      valuesMade.push(simplify(String(listItems[i])))
    }
    return([varsMade,valuesMade])
  }
  let p=document.getElementById("code").innerHTML;
  let lines=[];
  var j=0;
  for(let i = 0; i<p.length; i++){
    if(p[i]=="\n"){
      lines.push(p.substring(j,i));
      j=i+1;
    }
  }
  lines.push(p.substring(j,p.length));
  for(var j = 0; j<lines.length; j++){
    lines[j] = eliminateSpaces(lines[j]);
  }
  for(var j = 0; j<lines.length; j++){
    if(lines[j].includes("&lt;--")){
      if(variables.includes(lines[j].substring(0,lines[j].search("&lt;--")))){
        if(lines[j][lines[j].search("&lt;--")+6]=="[" && lines[j][lines[j].length-1]=="]"){
          let newVars=[];
          let newValues=[];
          let listName=lines[j].substring(0,lines[j].search("&lt;--"));
          let madeList=makeList();
          for(let item of madeList[0]){
            newVars.push(item)
          }
          for(let item of madeList[1]){
            newValues.push(item)
          }
          let i = 0;
          while(i<variables.length){
            if(variables[i].search(listName)==0 && variables[i][listName.length]=="[" && variables[i][variables[i].length-1]=="]"){
              variables.splice(i,1)
              values.splice(i,1)
            }else{
              i++
            }
            if(variables[i]==listName){
              values[i]=`[${newValues}]`
            }
          }
          for(let i = 0; i<newVars.length; i++){
            variables.push(newVars[i]);
            values.push(newValues[i]);
          }
          let container=lengthSort(variables,values);
          variables=container[0];
          values=container[1];
          if(!(lists.includes(listName))){
            lists.push(listName);
          }
        }else{
          if(lists.includes(lines[j].substring(0,lines[j].search("&lt;--")))){
            lists.splice(lists.indexOf(lines[j].substring(0,lines[j].search("&lt;--"))),1)
            let i = 0;
            while(i<variables.length){
              if(variables[i].search(lines[j].substring(0,lines[j].search("&lt;--")))==0 && variables[i][lines[j].substring(0,lines[j].search("&lt;--")).length]=="[" && variables[i][variables[i].length-1]=="]"){
                variables.splice(i,1);
                values.splice(i,1);
              }else{
                i++;
              }
            }
          }
          values[variables.indexOf(lines[j].substring(0,lines[j].search("&lt;--")))]=simplify(lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length));
        }
      }else{
        if(lines[j][lines[j].search("&lt;--")+6]=="[" && lines[j][lines[j].length-1]=="]"){
          let madeList=makeList()
          for(let item of madeList[0]){
            variables.push(item)
          }
          for(let item of madeList[1]){
            values.push(item)
          }
          variables.push(lines[j].substring(0,lines[j].search("&lt;--")));
          values.push(simplify(`"${lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length)}"`));
          lists.push(lines[j].substring(0,lines[j].search("&lt;--")));
        }else{
          variables.push(lines[j].substring(0,lines[j].search("&lt;--")));
          values.push(simplify(lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length)));
        }
        let container=lengthSort(variables,values);
        variables=container[0];
        values=container[1];
      }
    }
    if(lines[j].search("DISPLAY")==0 && lines[j][lines[j].length-1]==")" && lines[j][7]=="("){
      document.getElementById("output").innerHTML+=`<br/>${simplify(lines[j].substring(8,lines[j].length-1))}`;
    }
    for(let list of lists){
      let items = [];
      let included = 1;
      let i = 1;
      while(included==1){
        if(variables.includes(`${list}[${i}]`)){
          items.push(values[variables.indexOf(`${list}[${i}]`)]);
          i++;
        }else{
          included=0;
        }
      }
      values[variables.indexOf(list)]=`[${items}]`
    }
  }
  // console.log(variables)
  // console.log(values)
  // console.log(lists)
}
