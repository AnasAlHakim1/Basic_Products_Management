let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
let searchMood = 'title';

//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';

    }else{
        total.innerHTML = "";
        total.style.background = '#a00d02';           
    }
}

//create data
let dataProducts;
if(localStorage.product != null){
    dataProducts = JSON.parse(localStorage.product)
}else{
    dataProducts = [];
}

submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    //count
    if(title.value != '' 
       && price.value != '' 
       && category.value != ''
       && newProduct.count < 100){

        if(mood === 'create'){
            if(newProduct.count > 1){
                for(let i = 0 ; i < newProduct.count; i++){
                    dataProducts.push(newProduct)
                }
            }else{
                dataProducts.push(newProduct)
            }
        }else{
            dataProducts[tmp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }  
        clearData()
    }



    //save localstorage
    localStorage.setItem('product' , JSON.stringify(dataProducts))

    showData()
}

//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read
function showData(){
    getTotal()
    let table = '';
    for(let i = 1; i < dataProducts.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button onclick="updateDate(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>  ` 
        
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteall');
    if(dataProducts.length > 0){
        btnDelete.innerHTML = `
        <button onclick= "deleteAll()" >delete All (${dataProducts.length})</button>

        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()

//delete
function deleteData(i){
    dataProducts.splice(i,1);
    localStorage.product = JSON.stringify(dataProducts);
    showData()
}

//delete all
function deleteAll(){
    localStorage.clear()
    dataProducts.splice(0)
    showData()
}

//update
function updateDate(i){
    title.value = dataProducts[i].title ;
    price.value = dataProducts[i].price ;
    taxes.value = dataProducts[i].taxes ;
    ads.value = dataProducts[i].ads ;
    discount.value = dataProducts[i].discount ;
    getTotal()
    count.style.display = 'none';
    category.value = dataProducts[i].category ;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0 , 
        behavior:"smooth"
    })
}

//search
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchbytitle'){
        searchMood = 'title';

    }else{
        searchMood = 'category';
        
    }
    search.placeholder = 'Search By '+searchMood;

    search.focus()   
    search.value = ''; 
    showData()
}

function searchData(value){

    let table;

    if(searchMood == 'title'){

        for (let i = 0 ; i < dataProducts.length; i++){
            if(dataProducts[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateDate(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>  ` 
            }
        }
    }else{
        for (let i = 0 ; i < dataProducts.length; i++){
            if(dataProducts[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateDate(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>  ` 
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;

}

