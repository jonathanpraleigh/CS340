function deleteDeveloper(id){
    $.ajax({
        url: '/developer/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
