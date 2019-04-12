function execute(pseudocode,vars,vals,stuff,funcs,params) {
  if(!(pseudocode)){
    document.getElementById("output").innerHTML="";
  }
  let variables;
  let values;
  let lists;
  let procedures;
  let rvalue;
  let parameters;
  if(vars){
    variables=vars;
  }else{
    variables=[];
  }
  if(vals){
    values=vals;
  }else{
    values=[];
  }
  if(stuff){
    lists=stuff;
  }else{
    lists=[];
  }
  if(funcs){
    procedures=funcs;
  }else{
    procedures=[];
  }
  if(params){
    parameters=params;
  }else{
    parameters=[];
  }
  let lastIf = true;
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
  function manualSearch(expression,words,orderNum){
    let order = 1
    if(isNaN(orderNum)==false){
      order = orderNum;
    }
    count=0;
    for(let i = 0; i<expression.length; i++){
      if(expression.substring(i,i+words.length)==words){
        count++;
        if(count==order){
          return(i);
        }
      }
    }
    return(-1);
  }
  function backSearch(expression,words){
    for(let i = expression.length-1; i>=0; i--){
      if(expression.substring(i,i+words.length)==words){
        return(i);
      }
    }
    return(-1);
  }
  function getMax(array){
    let max = array[0];
    for(let item of array){
      if(item>max){
        max=item;
      }
    }
    return(max);
  }
  function simplify(expression){
    let code = expression;
    let done = 0;
    iters=0;
    while(done==0 && iters<100){
      iters++;
      done=1;
      try{
        code = eval(code);
      }catch(err){
        done=0;
        randomDone=0;
        while(randomDone==0){
          randomDone=1;
          if(code.includes("RANDOM") && code[code.search("RANDOM")+6]=="(" && manualSearch(code.substring(code.search("RANDOM")+7,code.length),")")!=-1 && !(code.substring(0,code.search("RANDOM")).includes('"')) && !(code.substring(code.search("RANDOM")+7,code.length-1).includes('"'))){
            let minimum = Number(simplify(code.substring(code.search("RANDOM")+7,code.search("RANDOM")+7+code.substring(code.search("RANDOM")+7,code.length).search(","))))
            let maximum = Number(simplify(code.substring(code.search("RANDOM")+7+code.substring(code.search("RANDOM")+7,code.length).search(",")+1,code.search("RANDOM")+7+manualSearch(code.substring(code.search("RANDOM")+7,code.length),")"))))
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
        lengthDone=0;
        while(lengthDone==0){
          lengthDone=1;
          if(code.includes("LENGTH") && code[code.search("LENGTH")+6]=="(" && manualSearch(code.substring(code.search("LENGTH")+7,code.length),")")!=-1 && !(code.substring(0,code.search("LENGTH")).includes('"')) && !(code.substring(code.search("LENGTH")+7,code.length-1).includes('"'))){
            let list = code.substring(code.search("LENGTH")+7,code.search("LENGTH")+7+manualSearch(code.substring(code.search("LENGTH")+7,code.length),")"))
            let count = 1;
            while(variables.includes(`${list}[${count}]`)){
              count++;
            }
            count--;
            code=`${code.substring(0,code.search("LENGTH"))}${count}${code.substring(code.search("LENGTH")+7+manualSearch(code.substring(code.search("LENGTH")+7,code.length),")")+1,code.length)}`
          }
          if(code.includes("LENGTH") && code[code.search("LENGTH")+6]=="(" && manualSearch(code.substring(code.search("LENGTH")+7,code.length),")")!=-1 && !(code.substring(0,code.search("LENGTH")).includes('"')) && !(code.substring(code.search("LENGTH")+7,code.length-1).includes('"'))){
            lengthDone=0;
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
        code = makeBracket(code);
        for(let variable of variables){
          while(code.includes(variable)){
            if(typeof(values[variables.indexOf(variable)])=="string" && (values[variables.indexOf(variable)][0]!='"' || values[variables.indexOf(variable)][values[variables.indexOf(variable)].length]!='"')){
              code = `${code.substring(0,manualSearch(code,variable))}"${values[variables.indexOf(variable)]}"${code.substring(code.search(variable)+variable.length,code.length)}`
              if(code[code.length-1]=="]" && code[code.length-2]=='"' && code[0]=='"'){
                code=code.substring(0,code.length-1);
              }
            }else{
              code = `${code.substring(0,manualSearch(code,variable))}${values[variables.indexOf(variable)]}${code.substring(manualSearch(code,variable)+variable.length,code.length)}`
            }
          }
        }
        for(let procedure of procedures){
          while(code.includes(procedure)){
            let layer = 1;
            let index = manualSearch(code,procedure)+procedure.length;
            let quoteCount=0;
            while(layer>0){
              index++;
              if(code[index]=='"'){
                quoteCount++;
              }
              if(code[index]=='('){
                layer++;
              }
              if(code[index]==')'){
                layer--;
              }
            }
            let k;
              for(let line = 0; line<lines.length; line++){
                if(manualSearch(lines[line],`PROCEDURE${procedure}(`)==0){
                  k=line+1;
                }
              }
              let program = "";
              let braceCount=1;
              let char = lines[k][0];
              let i = 0;
              while(braceCount>0 && lines[k+1]){
                program+=String(char);
                if(char=="{"){
                  braceCount++;
                }
                if(char=="}"){
                  braceCount--;
                }
                i++;
                if(i==lines[k].length){
                  program+="\n";
                  k++;
                  i=0;
                }
                char=lines[k][i];
              }
              while(program[program.length-1]=="\n"){
                program=program.substring(0,program.length-1)
              }
              program=program.substring(0,program.length-1);
              let items = code.substring(manualSearch(code,procedure)+1+procedure.length,index);
              let bucket = [""];
              for(let l = 0; l<items.length; l++){
                if(items[l]==","){
                  bucket.push("");
                }else{
                  bucket[bucket.length-1]+=String(items[l]);
                }
              }
              let newFuncs = parameters[procedures.indexOf(procedure)];
              for(let para = 0; para<newFuncs.length; para++){
                variables.push(newFuncs[para]);
                if(isNaN(bucket[para])==false){
                  bucket[para]=Number(bucket[para])
                }
                values.push(bucket[para]);
              }
              let container=lengthSort(variables,values);
              variables=container[0];
              values=container[1];
              let answer = execute(program,variables,values,lists,procedures,parameters);
              variables=answer[0];
              values=answer[1];
              lists=answer[2];
              procedures=answer[3];
              parameters=answer[4];
              for(let thing of newFuncs){
                values.splice(variables.indexOf(thing),1)
                variables.splice(variables.indexOf(thing),1);
              }
            code = `${code.substring(0,manualSearch(code,procedure))}${answer[5]}${code.substring(index+1,code.length)}`
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
  function doLayer(listString){
    let rlayers = [];
    let llayers = [];
    let layer = 0;
    let prevList = false;
    for(let k = 0; k<listString.length; k++){
      if(listString[k]=="["){
        layer++;
        rlayers.push(layer);
      }
      if(listString[k]=="]"){
        llayers.push(layer);
        layer--;
      }
    }
    return([rlayers,llayers])
  }
  function makeBracket(item){
    let listItems=item
    let prevList = false;
    let rlayers = [];
    let llayers = [];
    while((manualSearch(listItems,"[")!=-1 || manualSearch(listItems,"]")!=-1) && !(listItems[0]=='"' && listItems[listItems.length-1]=='"') && !(variables.includes(listItems)) && !(getMax(rlayers)==0 && getMax(llayers)==0)){
      if(prevList==false){
        listString=listItems;
        layer=0;
        rlayers=doLayer(listString)[0];
        llayers=doLayer(listString)[1];
      }
      let rmax = rlayers.indexOf(getMax(rlayers))+1;
      let lmax = llayers.indexOf(getMax(llayers))+1;
      prevList=listItems
      listItems=`${listItems.substring(0,manualSearch(listItems,"[",rmax))}[${simplify(listItems.substring(manualSearch(listItems,"[",rmax)+1,manualSearch(listItems,"]",lmax)))}]${listItems.substring(manualSearch(listItems,"]",lmax)+1,listItems.length)}`
      if(listItems==prevList){
        prevList=true;
      }else{
        prevList=false;
      }
      rlayers[rmax-1]=0;
      llayers[lmax-1]=0;
    }
    return(listItems)
  }
  function makeList(){
    let listString=`,${lines[j].substring(lines[j].search("&lt;--")+7,lines[j].length-1)}`;
    let listItems=[];
    let quoteCount=0;
    let parenthesesCount=0;
    let varsMade=[];
    let valuesMade=[];
    let layer = 0;
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
    for(let i = 0; i<listItems.length; i++){
      listItems[i]=simplify(makeBracket(listItems[i]));
    }
    for(let i = 0; i<listItems.length;i++){
      varsMade.push(`${varName}[${i+1}]`)
      valuesMade.push(simplify(String(listItems[i])))
    }
    if(listItems[0]==undefined && listItems.length==1){
      varsMade=[];
      valuesMade=[];
    }
    return([varsMade,valuesMade])
  }
  function check(statement){
    let code = statement;
    let conditions = [];
    let lastCon=0;
    let quoteCount=0;
    let layer = 0;
    let operators = [];
    let opList=["!=", "&lt;=", "&gt;=", "&lt;", "&gt;", "="];
    for(let i = 0; i<code.length; i++){
      if(code[i]=='"'){
        quoteCount++;
      }
      if(code[i]=="("){
        layer++;
      }
      if(code[i]==")"){
        layer--;
      }
      if(code[i]=="A" && code[i+1]=="N" && code[i+2]=="D" && layer==0 && quoteCount%2==0){
        conditions.push(code.substring(lastCon,i));
        operators.push("AND");
        lastCon=i+3;
      }
      if(code[i]=="O" && code[i+1]=="R" && layer==0 && quoteCount%2==0){
        conditions.push(code.substring(lastCon,i));
        operators.push("OR");
        lastCon=i+2;
      }
    }
    conditions.push(code.substring(lastCon,code.length));
    for(let i = 0; i<conditions.length; i++){
      if(conditions[i][0]=="(" && conditions[i][conditions[i].length-1]==")"){
        conditions[i]=check(conditions[i].substring(1,conditions[i].length-1));
      }else if(manualSearch(conditions[i],"NOT")==0){
        conditions[i]=!(check(conditions[i].substring(3,conditions[i].length)));
      }else{
        if(conditions[i].includes("=") || conditions[i].includes("&lt;") || conditions[i].includes("&gt;")){
          quoteCount=0;
          let rop;
          let opindex = conditions[i].length;
          for(let op of opList){
            if(manualSearch(conditions[i],op)<opindex && manualSearch(conditions[i],op)>-1){
              rop = op;
              opindex = manualSearch(conditions[i],op);
            }
          }
          let partOne=conditions[i].substring(0,opindex);
          let partTwo=conditions[i].substring(opindex+rop.length,conditions[i].length);
          if(rop=="="){
            if(simplify(partOne)==simplify(partTwo)){
              conditions[i]=true;
            }else{
              conditions[i]=false;
            }
          }else if(rop=="!="){
            if(simplify(partOne)==simplify(partTwo)){
              conditions[i]=false;
            }else{
              conditions[i]=true;
            }
          }else if(rop=="&lt;="){
            if(simplify(partOne)<=simplify(partTwo)){
              conditions[i]=true;
            }else{
              conditions[i]=false;
            }
          }else if(rop=="&gt;="){
            if(simplify(partOne)>=simplify(partTwo)){
              conditions[i]=true;
            }else{
              conditions[i]=false;
            }
          }else if(rop=="&lt;"){
            if(simplify(partOne)<simplify(partTwo)){
              conditions[i]=true;
            }else{
              conditions[i]=false;
            }
          }else if(rop=="&gt;"){
            if(simplify(partOne)>simplify(partTwo)){
              conditions[i]=true;
            }else{
              conditions[i]=false;
            }
          }
        }else{
          if(conditions[i]!=false){
            conditions[i]=true;
          }
        }
      }
    }
    while(conditions.length>1){
      if(operators[0]=="OR"){
        if(conditions[0] || conditions[1]){
          conditions[1]=true;
        }else{
          conditions[1]=false;
        }
        conditions.shift();
      }else if(operators[0]=="AND"){
        if(conditions[0] && conditions[1]){
          conditions[1]=true;
        }else{
          conditions[1]=false;
        }
        conditions.shift();
      }
    }
    if(conditions[0]){
      return(true);
    }else{
      return(false);
    }
  }
  let p;
  if(pseudocode==undefined){
    p=document.getElementById("code").innerHTML;
  }else{
    p=pseudocode;
  }
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
  j = 0;
  while(j<lines.length){
    let listAssign = 0;
    if(lines[j].includes("&lt;--")){
      if(manualSearch(lines[j].substring(0,lines[j].search("&lt;--")),"[")!=-1 && lines[j][lines[j].search("&lt;--")-1]=="]" && lists.includes(lines[j].substring(0,manualSearch(lines[j],"[")))){
        lines[j]=`${makeBracket(lines[j].substring(0,manualSearch(lines[j],"&lt;--")))}${lines[j].substring(manualSearch(lines[j],"&lt;--"),lines[j].length)}`
      }
      if(variables.includes(lines[j].substring(0,lines[j].search("&lt;--")))){
        if(lines[j][lines[j].search("&lt;--")+6]=="[" && lines[j][lines[j].length-1]=="]"){
          listAssign = 1;
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
          values[variables.indexOf(lines[j].substring(0,lines[j].search("&lt;--")))]=simplify(lines[j].substring(lines[j].search("&lt;--")+6,lines[j].length));
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
        }
      }else{
        if(lines[j][lines[j].search("&lt;--")+6]=="[" && lines[j][lines[j].length-1]=="]"){
          listAssign = 1;
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
    let ifresolved=0;
    while((lines[j].search("REPEAT")==0 && lines[j].search("TIMES{")==lines[j].length-6) || (lines[j].search("FOREACH")==0 && lines[j].includes("IN") && lines[j].search("{")==lines[j].length-1) || (ifresolved==0 && manualSearch(lines[j],"IF(")==0 && manualSearch(lines[j], "){")==lines[j].length-2) || (ifresolved==0 && lines[j]=="ELSE{") || (manualSearch(lines[j],"REPEATUNTIL(")==0 && manualSearch(lines[j],"){")==lines[j].length-2) || (manualSearch(lines[j],"PROCEDURE")==0 && manualSearch(lines[j],"(")!=-1 && manualSearch(lines[j], "){")==lines[j].length-2)){
      if(lines[j].search("REPEAT")==0 && lines[j].search("TIMES{")==lines[j].length-6){
        let n = simplify(lines[j].substring(6,lines[j].length-6));
        let code = "";
        let braceCount=1;
        let char = lines[j+1][0];
        let i = 0;
        let k = j+1
        while(braceCount>0 && lines[k+1]){
          code+=String(char);
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            code+="\n";
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        code=code.substring(0,code.length-1);
        for(let i = 0; i<n; i++){
          let container=lengthSort(variables,values);
          variables=container[0];
          values=container[1];
          let newValues = execute(code,variables,values,lists,proceures);
          variables=newValues[0];
          values=newValues[1];
          lists=newValues[2];
          procedures=newValues[3];
          parameters=newValues[4];
        }
        j=k
      }
      if(lines[j].search("FOREACH")==0 && lines[j].includes("IN") && lines[j].search("{")==lines[j].length-1){
        let counter = lines[j].substring(7,lines[j].search("IN"));
        let listName = lines[j].substring(lines[j].search("IN")+2,lines[j].length-1);
        let code = "";
        let braceCount=1;
        let char = lines[j+1][0];
        let i = 0;
        let k = j+1
        let count = 1;
        while(variables.indexOf(`${listName}[${count}]`)!=-1){
          count++;
        }
        count--;
        while(braceCount>0 && lines[k+1]){
          code+=String(char);
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            code+="\n";
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        code=code.substring(0,code.length-1);
        for(let i = 0; i<count; i++){
          if(variables.includes(counter)){
            values[variables.indexOf(counter)]=values[variables.indexOf(`${listName}[${i+1}]`)];
          }else{
            variables.push(counter);
            values.push(values[variables.indexOf(`${listName}[${i+1}]`)]);
          }
          let container=lengthSort(variables,values);
          variables=container[0];
          values=container[1];
          let newValues = execute(code,variables,values,lists,procedures,parameters);
          variables=newValues[0];
          values=newValues[1];
          lists=newValues[2];
          procedures=newValues[3];
          parameters=newValues[4];
        }
        j=k;
      }
      if(manualSearch(lines[j],"REPEATUNTIL(")==0 && manualSearch(lines[j],"){")==lines[j].length-2){
        let condition = lines[j].substring(12,lines[j].length-2);
        let code = "";
        let braceCount=1;
        let char = lines[j+1][0];
        let i = 0;
        let k = j+1
        while(braceCount>0 && lines[k+1]){
          code+=String(char);
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            code+="\n";
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        code=code.substring(0,code.length-1);
        while(!(check(condition))){
          let container=lengthSort(variables,values);
          variables=container[0];
          values=container[1];
          let newValues = execute(code,variables,values,lists,procedures,parameters);
          variables=newValues[0];
          values=newValues[1];
          lists=newValues[2];
          procedures=newValues[3];
          parameters=newValues[4];
        }
        j=k
      }
      if(manualSearch(lines[j],"IF(")==0 && manualSearch(lines[j], "){")==lines[j].length-2){
        let toTest = lines[j].substring(3,lines[j].length-2);
        let braceCount=1;
        let k = j+1;
        let char = lines[j+1][0];
        let i = 0;
        while(braceCount>0 && lines[k+1]){
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        if(check(toTest)==false){
          j=k;
          lastIf=true;
        }else{
          ifresolved=1;
          lastIf=false;
        }
      }
      if(lines[j]=="ELSE{"){
        let braceCount=1;
        let k = j+1;
        let char = lines[j+1][0];
        let i = 0;
        while(braceCount>0 && lines[k+1]){
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        if(!(lastIf)){
          j=k;
        }else{
          ifresolved=1;
        }
      }
      if(manualSearch(lines[j],"PROCEDURE")==0 && manualSearch(lines[j],"(")!=-1 && manualSearch(lines[j], "){")==lines[j].length-2){
        procedures.push(lines[j].substring(9,manualSearch(lines[j],"(")));
        let braceCount=1;
        let k = j+1;
        let char = lines[j+1][0];
        let i = 0;
        while(braceCount>0 && lines[k+1]){
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        let items = lines[j].substring(manualSearch(lines[j],"(")+1,lines[j].length-2);
        let bucket = [""];
        for(let l = 0; l<items.length; l++){
          if(items[l]==","){
            bucket.push("");
          }else{
            bucket[bucket.length-1]+=String(items[l]);
          }
        }
        if(bucket[0]==""){
          parameters.push([])
        }else{
          parameters.push(bucket)
        }
        j=k;
      }
    }
    if(lines[j].search("DISPLAY")==0 && lines[j][lines[j].length-1]==")" && lines[j][7]=="("){
      let tbd = `${simplify(lines[j].substring(8,lines[j].length-1))} `;
      if(lists.includes(lines[j].substring(8,lines[j].length-1)) && tbd[0]=="[" && tbd[1]==","){
        tbd=`[${tbd.substring(2,tbd.length)}`;
      }
      document.getElementById("output").innerHTML+=tbd;
    }
    if(lines[j].search("APPEND")==0 && lines[j][lines[j].length-1]==")" && lines[j][6]=="("){
      let quoteCount = 0;
      let commaCount;
      for(let i = 0; i<lines[j].length;i++){
        if(lines[j][i]=='"'){
          quoteCount++;
        }
        if(lines[j][i]=="," && quoteCount%2==0){
          commaCount=i;
        }
      }
      let list = lines[j].substring(7,commaCount);
      let value = simplify(lines[j].substring(commaCount+1,lines[j].length-1));
      let count = 1;
      while(variables.includes(`${list}[${count}]`)){
        count++;
      }
      count--;
      variables.push(`${list}[${count+1}]`);
      values.push(value)
      let container=lengthSort(variables,values);
      variables=container[0];
      values=container[1];
    }
    if(lines[j].search("REMOVE")==0 && lines[j][lines[j].length-1]==")" && lines[j][6]=="("){
      let quoteCount = 0;
      let commaCount;
      for(let i = 0; i<lines[j].length;i++){
        if(lines[j][i]=='"'){
          quoteCount++;
        }
        if(lines[j][i]=="," && quoteCount%2==0){
          commaCount=i;
        }
      }
      let list = lines[j].substring(7,commaCount);
      let index = simplify(lines[j].substring(commaCount+1,lines[j].length-1));
      let count = 1;
      while(variables.includes(`${list}[${count}]`)){
        count++;
      }
      count--;
      values.splice(variables.indexOf(`${list}[${index}]`),1);
      variables.splice(variables.indexOf(`${list}[${index}]`),1);
      for(let i = index+1; i<count+1; i++){
        variables[variables.indexOf(`${list}[${i}]`)]=`${list}[${i-1}]`;
      }
      let container=lengthSort(variables,values);
      variables=container[0];
      values=container[1];
    }
    if(lines[j].search("INSERT")==0 && lines[j][lines[j].length-1]==")" && lines[j][6]=="("){
      let quoteCount = 0;
      let commaCount = []
      for(let i = 0; i<lines[j].length;i++){
        if(lines[j][i]=='"'){
          quoteCount++;
        }
        if(lines[j][i]=="," && quoteCount%2==0){
          commaCount.push(i);
        }
      }
      let list = lines[j].substring(7,commaCount[0]);
      let index = simplify(lines[j].substring(commaCount[0]+1,commaCount[1]));
      let value = simplify(lines[j].substring(commaCount[1]+1,lines[j].length-1));
      let count = 1;
      while(variables.includes(`${list}[${count}]`)){
        count++;
      }
      count--;
      for(let i = count; i>=index; i--){
        variables[variables.indexOf(`${list}[${i}]`)]=`${list}[${i+1}]`;
      }
      values.push(value)
      variables.push(`${list}[${index}]`)
      let container=lengthSort(variables,values);
      variables=container[0];
      values=container[1];
    }
    if(procedures.includes(lines[j].substring(0,manualSearch(lines[j],"(")))){
      let layer = 1;
      let procedure=lines[j].substring(0,manualSearch(lines[j],"("));
      let index = procedure.length;
      let quoteCount=0;
      while(layer>0){
        index++;
        if(lines[j][index]=='"'){
          quoteCount++;
        }
        if(lines[j][index]=='('){
          layer++;
        }
        if(lines[j][index]==')'){
          layer--;
        }
      }
      let k;
        for(let line = 0; line<lines.length; line++){
          if(manualSearch(lines[line],`PROCEDURE${procedure}(`)==0){
            k=line+1;
          }
        }
        let program = "";
        let braceCount=1;
        let char = lines[k][0];
        let i = 0;
        while(braceCount>0 && lines[k+1]){
          program+=String(char);
          if(char=="{"){
            braceCount++;
          }
          if(char=="}"){
            braceCount--;
          }
          i++;
          if(i==lines[k].length){
            program+="\n";
            k++;
            i=0;
          }
          char=lines[k][i];
        }
        while(program[program.length-1]=="\n"){
          program=program.substring(0,program.length-1)
        }
        program=program.substring(0,program.length-1);
        let items = lines[j].substring(manualSearch(lines[j],procedure)+1+procedure.length,index);
        let bucket = [""];
        for(let l = 0; l<items.length; l++){
          if(items[l]==","){
            bucket.push("");
          }else{
            bucket[bucket.length-1]+=String(items[l]);
          }
        }
        let newFuncs = parameters[procedures.indexOf(procedure)];
        for(let para = 0; para<newFuncs.length; para++){
          variables.push(newFuncs[para]);
          if(isNaN(bucket[para])==false){
            bucket[para]=Number(bucket[para])
          }
          values.push(bucket[para]);
        }
        let container=lengthSort(variables,values);
        variables=container[0];
        values=container[1];
        let answer = execute(program,variables,values,lists,procedures,parameters);
        variables=answer[0];
        values=answer[1];
        lists=answer[2];
        procedures=answer[3];
        parameters=answer[4];
        for(let thing of newFuncs){
          values.splice(variables.indexOf(thing),1)
          variables.splice(variables.indexOf(thing),1);
        }
    }
    if(lines[j].search("RETURN")==0 && lines[j][lines[j].length-1]==")" && lines[j][6]=="("){
      if(rvalue==undefined){
        rvalue=simplify(lines[j].substring(7,lines[j].length-1))
      }
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
    j++;
  }
  return([variables,values,lists,procedures,parameters,rvalue])
}
