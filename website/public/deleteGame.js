function deleteGame(id){
    $.ajax({
        url: '/game/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
