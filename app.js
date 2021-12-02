
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

function BuilderElement(name){
    this.element = document.createElement(name);

    this.className = function(className){
        this.element.className = className;
        return this;
    }

    this.type = function(type){
        this.element.type = type;
        return this;
    }

    this.id = function(id){
        this.element.id = id;
        return this;
    }

    this.value = function(value){
        this.element.value = value;
        return this;
    }
    
    this.text = function(text){
        this.element.textContent = text;
        return this;
    }

    this.innerHTML = function(innerHTML){
        this.element.innerHTML = innerHTML;
        return this;
    }

    this.placeholder = function(placeholder){
        this.element.placeholder = placeholder;
        return this;
    }

    this.show = function(){
        this.element.style.display = "";
        return this;
    }

    this.inline = function(){
        this.element.style.display = "inline-block";
        return this;
    }

    this.hide = function(){
        this.element.style.display = "none";
        return this;
    }

    this.onclick = function(fn){
        this.element.onclick = fn;
        return this;
    }

    this.appendTo = function(parent){
        if(parent instanceof BuilderElement){
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

const builder = {
    create : function(name){
        return new BuilderElement(name);
    }
}

function BuilderPhoneBook(countainer,phonebook){
    this.countainer = countainer;
    this.phonebook = phonebook;
    let ul = null;
    let records;

    function ShowList(records){
        ul.innerHTML('');
        records.forEach(function(record) {
            const li = builder
            .create("li")
            .appendTo(ul);

            builder
            .create("div")
            .inline()
            .text(`name: ${record.name} _ phone: ${record.phone}`)
            .appendTo(li);
    
            builder
            .create("input")
            .type("button")
            .value("x")
            .appendTo(li)
            .onclick(function(){
                phonebook.remove(record);
                ShowList(phonebook.list);
            });
        });

    }

    this.init = function(){
        const row = builder
        .create("div")
        .className("row")
        .appendTo(countainer);

        const col1 = builder
        .create("div")
        .className("col-9")
        .appendTo(row);

        const search = builder
        .create("input")
        .type("text")
        .appendTo(col1);

        const btnSearch = builder
        .create("input")
        .type("button")
        .value("Search")
        .appendTo(col1)
        .onclick(function(){
            const searchedList = phonebook.search(search.build().value);
            ShowList(searchedList);
        });

        const btnAdd = builder
        .create("input")
        .type("button")
        .value("Add")
        .appendTo(col1)
        .onclick(function(){
                col1.hide();
                colList.hide();
                colAdd.show();
                });

        const colAdd = builder
        .create("div")
        .className("col-12")
        .hide()
        .appendTo(row);

        const nameAdd   = builder
        .create("input")
        .type("text")
        .placeholder("Name")
        .id("nameAdd")
        .appendTo(colAdd);

        builder.create("br").appendTo(colAdd);

        const phoneAdd  = builder
        .create("input")
        .type("text")
        .placeholder("Phone")
        .id("phoneAdd")
        .appendTo(colAdd);

        builder.create("br").appendTo(colAdd);
        builder.create("br").appendTo(colAdd);

        const btnSave   = builder
        .create("input")
        .type("button")
        .value("Save")
        .appendTo(colAdd)
        .onclick(function(){
            phonebook.add(nameAdd.build().value,phoneAdd.build().value);
            ShowList(phonebook.list);
            col1.show();
            colList.show();
            colAdd.hide();
            nameAdd.value("");
            phoneAdd.value("");
        });

        const btnCancel = builder
        .create("input")
        .type("button")
        .value("Cancel")
        .appendTo(colAdd)
        .onclick(function(){
                col1.show();
                colList.show();
                colAdd.hide();});

        const colList = builder
        .create("div")
        .className("col-6")
        .appendTo(row);

        ul = builder
        .create("ul")
        .appendTo(colList);


    };

}






const countainer = document.getElementById("main");
const PhoneBookListApp = new PhoneBookList();
const app = new BuilderPhoneBook(countainer,PhoneBookListApp);
app.init();
//console.log(countainer);
//x.add("samaa",098878738);
//x.add("reza",666666);
//console.log(x.list);
//let y = x.search('r');
//x.remove(y);
//console.log(x.list);
















