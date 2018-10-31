function updateDeveloper(id){
    $.ajax({
        url: '/developer/' + id,
        type: 'PUT',
        data: $('#update-developer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
