function viewModel() {
  var self = this;
  self.tasks = ko.observableArray([]);
  self.taskName = ko.observable();
  self.addTask = function () {
    var task = {
      id: self.tasks().length + 1,
      name: self.taskName(),
      isCompleted: false,
    };

    self.tasks.push(task);
  };
  self.removeTask = function () {
    console.log('remove');
  };
}

var vm = new viewModel();

ko.applyBindings(vm);
