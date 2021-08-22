function viewModel() {
  var self = this;
  self.tasks = ko.observableArray([]);
  self.isErrored = ko.observable(false);
  self.taskToEdit = ko.observable({});
  self.taskName = ko.observable();
  self.addTask = function () {
    if (self.setError()) return;

    var task = {
      id: self.tasks().length,
      name: self.taskName(),
      isCompleted: false,
    };

    self.tasks.push(task);
  };
  self.removeTask = function (id) {
    setTimeout(function () {
      var newArray = [];

      for (let i = 0; i < self.tasks().length; i++) {
        if (self.tasks()[i].id !== id) {
          newArray.push(self.tasks()[i]);
        }
      }

      self.tasks(newArray);
    }, 200);
  };
  self.setError = function () {
    if (!self.taskName()) {
      self.isErrored(true);
      return true;
    }

    self.isErrored(false);
    return false;
  };
  self.setCompleted = function (id) {
    var updatedArray = [];

    for (let i = 0; i < self.tasks().length; i++) {
      if (self.tasks()[i].id === id) {
        self.tasks()[i] = {
          id: id,
          name: self.tasks()[i].name,
          isCompleted: !self.tasks()[i].isCompleted,
        };
      }
      updatedArray.push(self.tasks()[i]);
    }
    self.tasks(updatedArray);
  };
  self.editTask = function (id, nome) {
    var updatedArray = [];

    for (let i = 0; i < self.tasks().length; i++) {
      if (self.tasks()[i].id === id) {
        self.tasks()[i] = {
          id: id,
          name: nome,
          isCompleted: self.tasks()[i].isCompleted,
        };
      }
      updatedArray.push(self.tasks()[i]);
    }

    setTimeout(() => {
      self.tasks(updatedArray);
    }, 200);
  };
}

var vm = new viewModel();

ko.applyBindings(vm);
