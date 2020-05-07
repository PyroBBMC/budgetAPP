// Budget Controller

var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    }
  };

  return {

    addItem: function (type, des, val) {
      var newItem, ID;

      ID = 0;

      // Create New ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },
    testing: function () {
      console.log(data);
    }
  };


})();



// UI Controller
var UIcontroller = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      }
    },
    getDOMstrings: function () {
      return DOMstrings;
    }
  }
})();



// Global App Controller

var controller = (function (budgetCtrl, UICtrl) {

  var setupEventListners = function () {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
    var input, newItem;

    // 1. Get the filed input data
    input = UICtrl.getInput();

    // 2. Add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add new item to UI
    // 4. Calculate budget
    // 5. Display budget
  };

  return {
    init: function () {
      console.log('Application Started');
      setupEventListners();
    }
  }

})(budgetController, UIcontroller);

controller.init();