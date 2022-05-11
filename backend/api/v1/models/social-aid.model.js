function SocialAid(element) {
    if(element){
        this.id = parseInt(element.id);
        this.title = element.title;
        this.description = element.description;
        this.creationDate = parseInt(element.creationDate);
        this.tokens = parseInt(element.tokens);
        this.imageURL = element.imageURL;
        this.created = element.created;
        this.condition = new Condition(element.condition);
    }
}

function Condition(element) {
    if(element){
        this.condition_type = parseInt(element.condition_type);
        this.minRange = parseInt(element.minRange);
        this.maxRange = parseInt(element.maxRange);
        this.param = element.param;
    }
}

module.exports = {
    SocialAid,
}