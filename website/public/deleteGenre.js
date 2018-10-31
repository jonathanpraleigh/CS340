function deleteGenre(id){
    $.ajax({
        url: '/genre/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
