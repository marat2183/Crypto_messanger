$(document).ready(function () {

    $('#send_create_dialog').click(function (event) {
        event.preventDefault();
        let reciever = $('#reciever').val();
        console.log(reciever);
        $.ajax({
            type: "POST",
            url: '{% url create_dialogs %}',
            dataType: 'json',
            data: {reciever: reciever, csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
            success: function (data) {
                if (data.message == 'ok') {
                    console.log(data.message)
                    document.location.href = '/dialogs/';
                }
                else
                {
                    console.log(data.message)
                    document.location.href = '/create/';
                }
            }
        });
    });
    window.setInterval(function () {
        // $.ajax({
        //     type: "POST",
        //     url: '{% url dialogs %}',
        //     dataType: 'json',
        //     data: {message: 'load_dialogs', csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
        //     success: function (data) {
        //         $('#dialog').remove()
        //         $('#dialogs-list').html(data)
        //     }
        // });
        alert('hello')
    },2000)
});