class UserInfo extends HJsBase {

    id = newGuid();
    username = null;
    email = null;
    displayName = null;

    toString() {
        if (this.displayName)
            return this.displayName;

        if (this.username)
            return this.username;

        if (this.email)
            return this.email;

        return this.id;
    }

}