$('#add_user').submit(function(e) {
    alert('Add User Successfully!!!');
});

$("#update_user").submit(function(e) {
    e.preventDefault();

    var unindexed_array = $("#update_user").serializeArray();
    var data = {};

    $.map(unindexed_array, function(n,i) {
        //xài map rồi nhét dữ liệu vào dât, vì dữ liệu ban đầu là object
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url": `http://localhost:3000/control/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert('Update Successfully!!!');
    })
});

if(window.location.pathname == '/') {
    $onDelete = $('.table tbody td a.delete');
    $onDelete.click(function() {
        var id = $(this).attr('data-id');

        var request = {
            "url": `http://localhost:3000/control/users/${id}`,
            "method": "DELETE",
        }

        if(confirm("Are you sure you want to delete this")) {
            $.ajax(request).done(function(response) {
                alert('Delete Successfully!!!');
                Location.reload();
            })
        }
    })
}