
function PhoneBook(name,phone){
    this.name = name;
    this.phone = phone;
}

function PhoneBookList(){
    this.list = [];

    this.add = function(name,phone){
        this.list.push(new PhoneBook(name,phone));
    }

    this.remove = function(record){
        const removeIdx = this.list.indexOf(record);
       // const removeIdx = this.list.findIndex(function(name,phone){
         //   return ((this.name === name) && (this.phone===phone));
        //});
        if(removeIdx  != -1 ){
            this.list.splice(removeIdx);
        }
    }

    this.search = function(keyword){
        return this.list.filter(function(record){
            return record.name.toLowerCase().includes(keyword.toLowerCase());
        })

    }
}

function BulderElement(name){
    this.element = document.createElement(name);

    this.className = function(className){
        this.element.className = className;
        return this;
    }

    this.type = function(type){
        this.element.type = type;
        return this;
    }

    this.value = function(value){
        this.element.value = value;
        return this;
    }
    
    this.onclick = function(fn){
        this.element.onclick = fn;
        return this;
    }

    this.appendTo = function(parent){
        if(parent instanceof BulderElement){
            parent.build().appendChild(this.element);
            return this;
        }
        parent.appendChild(this.element);
        return this;
    }

    this.build = function () {
		return this.element;
	};

    return this;
}

const bulder = {
    create : function(name){
        return new BulderElement(name);
    }
}

function BulderPhoneBook(countainer,phonebook){
    this.countainer = countainer;
    this.phonebook = phonebook;

    this.init = function(){
        //const input = new BulderElement("input");
        //input.type('text');

        const row = bulder.create("div").className("row").appendTo(countainer);
        //this.countainer.appendChild(row);

        const col1 = bulder.create("div").className("col-9").appendTo(row);
     
        const search = bulder.create("input").type("text").appendTo(col1);

        const btnSearch = bulder.create("input").type("button").value("Search").appendTo(col1);
        btnSearch.onclick = function(){
            phonebook.search();
        }

        const btnAdd = bulder.create("input").type("button").value("Add").appendTo(col1);
        btnAdd.onclick = function(){
            phonebook.add();
        }

        const col2 = bulder.create("div").className("col-6").appendTo(row);

        const ul = bulder.create("ul").appendTo(col2);

        const li = bulder.create("li").appendTo(ul);
        //li.style.display = "inline-block";

        const btnRemove = bulder.create("input").type("button").value("x").appendTo(col2);
        btnRemove.onclick =function(){
            phonebook.remove();
        }
        const br = bulder.create("br").appendTo(col1);
        //row.appendChild(countainer);
        //row.countainer.appendChild(row);
        const colAdd = bulder.create("div").className("col-12").appendTo(row);
        

        const nameAdd = bulder.create("input").type("text").appendTo(colAdd);
        const phoneAdd = bulder.create("input").type("text").appendTo(colAdd);

    };

}
/*<div class="countainer" >

<div class="col-9">
    <ul>
        <li style="display: inline-block;">name: samaa - phone: 09876767</li>
        <input type="button" value="x">
    </ul>
</div>
</div>*/





const countainer = document.getElementById("main");
const PhoneBookListApp = new PhoneBookList();
const app = new BulderPhoneBook(countainer,PhoneBookListApp);
app.init();
//console.log(countainer);
//x.add("samaa",098878738);
//x.add("reza",666666);
//console.log(x.list);
//let y = x.search('r');
//x.remove(y);
//console.log(x.list);
















