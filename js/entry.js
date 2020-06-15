window.ToDoList = {
    API_URL: 'http://localhost:8081/entries',
    createTask: function(){
        let firstNameValue = $('#inlineFormInputFirstName').val();
        let lastNameValue = $('#inlineFormInputLastName').val();
        let numberValue = $('#inlineFormInputNumber').val();
        let emailValue = $('#inlineFormInputEmail').val();

        var requestBody = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            number: numberValue,
            email: emailValue
        }

        $.ajax({
            url: ToDoList.API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function (response) {
           ToDoList.getTasks();

        });
    },

    getTasks: function(){
        $.ajax({
            url: ToDoList.API_URL,
        }).done(function (response) {
            ToDoList.displayTasks(JSON.parse(response));
        });
    },

    displayTasks: function(tasks){
        let rowsHtml = ``;

        tasks.forEach(task => rowsHtml += ToDoList.getTaskRowHtml(task));

        $('#tasks-table tbody').html(rowsHtml);

    },

    getTaskRowHtml: function(task) {
        return `<tr>
                  <td>${task.firstName}</td>
                  <td>${task.lastName}</td>
                  <td>${task.number}</td>
                  <td>${task.email}</td>
                  <td>
                    <a href="#" class="update-task actions" data-id=${task.id}>
                      <i
                        class="fa fa-wrench"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      ></i>
                    </a>
                    <a href="#" class="remove-task actions" data-id=${task.id}>
                      <i class="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>`
    },

    bindEvents: function () {
        $('#create-task-form').submit(function (event) {
            event.preventDefault();
            ToDoList.createTask();
        });

    }
};

ToDoList.getTasks();
ToDoList.bindEvents();