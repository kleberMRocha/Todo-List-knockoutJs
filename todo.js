function viewModel() {
  var self = this;
  self.tasks = ko.observableArray([]);
  self.isErrored = ko.observable(false);
  self.taskToEdit = ko.observable({});
  self.totalTarefas = ko.computed(function () {
    return self.tasks().length;
  });
  self.totalTarefasConcluidas = ko.computed(function () {
    let totalTarefas = self.tasks().length;
    let concluidas = 0;
    for (var i = 0; i < totalTarefas; i++) {
      if (self.tasks()[i].isCompleted) {
        concluidas = concluidas += 1;
      }
    }

    return concluidas ? Math.floor((concluidas * 100) / totalTarefas) : 0;
  });
  self.taskName = ko.observable('');
  self.type = ko.observable('');
  self.addTask = function () {
    if (self.setError()) return;

    var task = {
      id: self.tasks().length,
      name: self.taskName(),
      tipo: self.type(),
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
          tipo: self.tasks()[i].tipo,
          isCompleted: !self.tasks()[i].isCompleted,
        };
      }
      updatedArray.push(self.tasks()[i]);
    }
    self.tasks(updatedArray);
  };
  self.editTask = function (id, nome, tipo) {
    var updatedArray = [];

    for (let i = 0; i < self.tasks().length; i++) {
      if (self.tasks()[i].id === id) {
        self.tasks()[i] = {
          id: id,
          name: nome,
          tipo: tipo,
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
