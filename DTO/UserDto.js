class UserDto{
    constructor(user){
        this.fullName = `${user.name} ${user.lastName}`;
        this.address = user.address;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
    }
}

export default UserDto;