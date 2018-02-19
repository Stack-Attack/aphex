//test file for drawing users from an API

const UsersAPI = {
    users: [
        { id: 0, name: 'Kyle'},
        { id: 1, name: 'Peter'},
        { id: 2, name: 'Sean' },
        { id: 3, name: 'Danny' }
    ],
    all: function(){
        return this.users;
    },
    get: function(id){
        const isUser = p => p.id === id;
        return this.users.find(isUser);
    }
};

export default UsersAPI;