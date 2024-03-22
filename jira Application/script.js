const drag_item_list=document.querySelectorAll(".drag_item_list");


let todo_List=document.querySelector("#todo_List");
let progress_list=document.querySelector("#progres_List");
let done_list=document.querySelector("#done_list");




const addbuttons=document.querySelectorAll(".add_btn:not(.update)");
const save_buttons=document.querySelectorAll(".update");
const add_container=document.querySelectorAll(".add_container");
const add_items=document.querySelectorAll(".add_item");


let todoListarray=[];
let progressListarray=[];
let doneListarray=[];
let Listarrays=[];

let updatedonload=true;

let draggeditem;
// bunun sayesinde hangi itemi sürüklediğimizi anlarız

let currentColumn;

function getSavedColumns(){
    if(localStorage.getItem("todoItems")){
        todoListarray=JSON.parse(localStorage.getItem("todoItems"));
        // burda json stringini javascript objesine çevirme işlemi yapıyoruz
        progressListarray=JSON.parse(localStorage.getItem("progressItems"));
        doneListarray=JSON.parse(localStorage.getItem("doneItems"));
    }
    else{
        todoListarray=["React entegration","Angular entegration"];
        progressListarray=["Cloud Computung","Dockerlar"];
        doneListarray=["Data entegration","Vuejs"];
    }

}

function updateSavedColumns(){
    Listarrays=[todoListarray,progressListarray,doneListarray];
    const arrayNames=["todo","progress","done"];
    arrayNames.forEach((name,index)=>{
        localStorage.setItem(`${name}Items`,JSON.stringify(Listarrays[index]));
    });

}


function updateDom(){
    if(updatedonload){
        updatedonload=false;
        getSavedColumns(); 
    }
    console.log(updatedonload);
    todo_List.textContent="";
    todoListarray.forEach((todo,index)=>{
       createItem(todo_List,0,todo,index);
    })
    progress_list.textContent="";
    progressListarray.forEach((progress,index)=>{
        createItem(progress_list,1,progress,index);
     })
    done_list.textContent="";
    doneListarray.forEach((done,index)=>{
        createItem(done_list,2,done,index);
     })
    // ben tekrar getSavedColumns() fonksiyonunu çağırmak istemiyorum 
    // o yuzden false atamasını yapıcam
    
    updateSavedColumns();
}
function drag(e){ 
    draggeditem=e.target;
    // burada hangi li elementini sürüklüyorum onu öğreniyorum
    // console.log(draggeditem);
    draggeditem.classList.add("current_item");
}

function dragEnter(column){
    // console.log(drag_item_list[column]);
    currentColumn=column;
    drag_item_list[currentColumn].classList.add("over");
}

function allowdrop(e){
    e.preventDefault();
}
function updateInsideArrays(){
    todoListarray=[];
    for(let i=0;i<todo_List.children.length;i++){
        todoListarray.push(todo_List.children[i].textContent);
    }
    // console.log(todoListarray);
    progressListarray=[];

    for(let i=0;i<progress_list.children.length;i++){
        progressListarray.push(progress_list.children[i].textContent);
    }
    doneListarray=[];

    for(let i=0;i<done_list.children.length;i++){
        doneListarray.push(done_list.children[i].textContent);
    }
    updateDom();
}

function drop(e){
    e.preventDefault();
    drag_item_list.forEach(each_column=>{
        each_column.classList.remove("over");
    })
    const parent=drag_item_list[currentColumn];
    parent.appendChild(draggeditem);
    updateInsideArrays();
}

function createItem(columnItem,column,item,index){
    const listItem=document.createElement("li");
    listItem.draggable=true;
    listItem.classList.add("drag_item");
    listItem.textContent=item;
    // listItem.contentEditable=true;
    listItem.setAttribute("ondragstart","drag(event)");
    // listItem.setAttribute("onfocusout",`updateItem(${index},${column})`)
    columnItem.appendChild(listItem);
}
// function updateItem(index,column){
//     const selected_array=Listarrays[column];
//     console.log(selected_array);
//     const selected_column=drag_item_list[column].children;
//     console.log(selected_column);
//     if(!selected_column[index].textContent){
//         delete selected_array[index];
//     }
//     else{
//         selected_array[index]=selected_column[index].textContent;
//     }
    
// }


function showitemdiv(column){
// + iconuna tıkladığımda + iconunun kaybolmasını istiyorum 
// ve  save butonu ve div ekleme yerini göstermek istiyorum 
    addbuttons[column].style.visibility="hidden";
    save_buttons[column].style.display="block";
    add_container[column].style.display="block";
}

 function hideitemdiv(column){
    save_buttons[column].style.display="none";
    add_container[column].style.display="none";
    addbuttons[column].style.visibility="visible";

    addToColumn(column);
}

function addToColumn(column){
    const selected_array=Listarrays[column];
    let item_text=add_items[column].textContent
    if(!item_text==""){
        selected_array.push(item_text);
        add_items[column].textContent="";
        updateDom();
    }
    
    
}

updateDom();