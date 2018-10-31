function deletePublisher(id){
    $.ajax({
        url: '/publisher/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
