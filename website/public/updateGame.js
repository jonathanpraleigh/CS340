function updateGame(id){
    $.ajax({
        url: '/game/' + id,
        type: 'PUT',
        data: $('#update-game').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
