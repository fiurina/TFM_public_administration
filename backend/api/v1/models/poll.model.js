function Poll(poll) {
    if(poll){
        this.id = parseInt(poll.id);
        this.title = poll.title;
        this.description = poll.description;
        this.creationDate = parseInt(poll.creationDate);
        this.imageURL = poll.imageURL;
        this.created = poll.created;
        this.question = poll.question; 
        this.answerOptions = poll.answerOptions;
        if(poll.results) this.results = poll.results;
    }
}

module.exports = {
    Poll,
}