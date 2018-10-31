function updateGenre(id){
    $.ajax({
        url: '/genre/' + id,
        type: 'PUT',
        data: $('#update-genre').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
