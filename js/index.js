let ProductName =document.getElementById('ProductName');
let ProductPrice =document.getElementById('ProductPrice');
let ProductCategory =document.getElementById('ProductCategory');
let ProductDec =document.getElementById('ProductDec');
let addProduct =document.getElementById('addProduct');
let searchInpute=document.getElementById('search');
let inputs =document.querySelectorAll('input');
let deleteProduct;
let  updateProduct;
let validation ;

nameRegex=/^[A-Z][a-z]{3,8}$/i   ;
priceRegex=/^[0-9]{3,6}$/;
let addAllProducts=[];

if (localStorage.getItem('broducts')!=null) {
    addAllProducts=JSON.parse(localStorage.getItem('broducts'));
    display ()
}

addProduct.addEventListener('click',function(){
if(validation){
    addProducts();
    addToLocal();
    display ();
    clear();
    validation= false;
    removeValid();
}
    

})

function addProducts(){
    let product ={
        Name : ProductName.value,
        Price : ProductPrice.value,
        Category : ProductCategory.value,
        Dec : ProductDec.value,
    }
    addAllProducts.push(product);
}

function addToLocal(){
   
    localStorage.setItem('broducts',JSON.stringify(addAllProducts));
}

function display () {
    cartoona='';
    for (let i = 0; i < addAllProducts.length; i++) {
        if(addAllProducts[i].Dec==''){
            addAllProducts[i].Dec='null'
        }
        cartoona+= `
        <tr>  
            <td>${addAllProducts[i].Name}</td>
            <td>${addAllProducts[i].Price}</td>
            <td>${addAllProducts[i].Category}</td>
            <td>${addAllProducts[i].Dec}</td>
            <td><button class=" update btn btn-outline-success " id="update" > update</button></td>
            <td><button  class=" deleteButton btn btn-outline-danger" id="delete" > Delete</button></td>
        </tr>

    `
    }
    document.getElementById('add').innerHTML=cartoona;
    deleteProduct=document.querySelectorAll('.deleteButton');
    updateProduct =document.querySelectorAll('.update');
    deleteProdcts()
    updateProducts()
}

searchInpute.addEventListener('input',function(){
    cartoona='';
    for (let i = 0; i < addAllProducts.length; i++) {
        if(addAllProducts[i].Name.toLowerCase().includes(searchInpute.value.toLowerCase()))
        cartoona+= `
        <tr> 
        <td>${i+1}</td>   
        <td>${addAllProducts[i].Name}</td>
        <td>${addAllProducts[i].Price}</td>
        <td>${addAllProducts[i].Category}</td>
        <td>${addAllProducts[i].Dec}</td>
        <td><button onclick="deletProducts(${i})" class=" deleteButton btn btn-outline-danger btn-sm" id="delete" index=${i}> Delete</button></td>
        <td><button class=" btn btn-outline-success btn-sm" id="update" index=${i}> update</button></td>
    </tr> 
        `
    }
    document.getElementById('add').innerHTML=cartoona;
});

function clear(){
     ProductName.value='';
     ProductPrice.value='';
     ProductCategory.value='';
     ProductDec.value='';
}

function updateProducts(){
for (let i = 0; i < updateProduct.length; i++) {
    updateProduct[i].addEventListener('click',function () {
    ProductName.value=addAllProducts[i].Name;
    ProductPrice.value=addAllProducts[i].Price;
    ProductCategory.value=addAllProducts[i].Category;
    ProductDec.value=addAllProducts[i].Dec;
    addAllProducts.splice(i,1);
    addToLocal();
        display();
    })
}
    
}

function deleteProdcts(){
    for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener('click',function () {
            addAllProducts.splice(i,1);
            addToLocal();
            display();
        })
    }
    
}
function removeValid() {
    ProductName.classList.remove('is-valid')
    ProductPrice.classList.remove('is-valid')
    ProductCategory.classList.remove('is-valid')
}
function addValidRemoveInvalid(element) {
    element.classList.add('is-valid')
    element.classList.remove('is-invalid')
    return true
}

function removeValidAddInvalid(element) {
    element.classList.add('is-invalid')
    element.classList.remove('is-valid')
    return false
}

function testRegexOfName() {
    
        if (nameRegex.test(ProductName.value)) {
            addValidRemoveInvalid(ProductName);
            return true
        }
        else {
            removeValidAddInvalid(ProductName);
            return false
        }
        
    
}

function testRegexOfPrice() {
    
        if (priceRegex.test(ProductPrice.value)) {
            addValidRemoveInvalid(ProductPrice);
            return true;
        }
        else {
            removeValidAddInvalid(ProductPrice);
            return false;
        }
        
    
}

function testRegexOfCategory() {

        if (nameRegex.test(ProductCategory.value)) {
            addValidRemoveInvalid(ProductCategory);
            return true;
        }
        else {
            removeValidAddInvalid(ProductCategory);
            return false;
            
        }
        
    
}

function Validation(e) {
    if(e.target.getAttribute('id')=='ProductName'){
        testRegexOfName()
        
    }
    else if(e.target.getAttribute('id')=='ProductPrice'){
        testRegexOfPrice()
        
    }
    else if(e.target.getAttribute('id')=='ProductCategory'){
        testRegexOfCategory()
        
    }
    if(testRegexOfName()==true&&testRegexOfPrice()==true&&testRegexOfCategory()==true){
        console.log('true');
        validation= true;
    }
}

for (let i = 0; i < inputs.length-1; i++) {
    inputs[i].addEventListener('keyup',function (e) {
    Validation(e)
    })
    
}