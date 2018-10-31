function updatePublisher(id){
    $.ajax({
        url: '/publisher/' + id,
        type: 'PUT',
        data: $('#update-publisher').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
