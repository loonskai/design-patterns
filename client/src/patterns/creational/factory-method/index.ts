type User = Record<string, unknown>;
interface RoleInstance {
  users: User[];
	getUsers(): User[];
}

class AdminRole implements RoleInstance {
  users = [];

  public getUsers(): User[] {
    return this.users.filter(user => ({ /* filter information for admin */ }));
  }
}

class ModeratorHelper implements RoleInstance {
  users = [];

  public getUsers(): User[] {
    return this.users.filter(user => ({ /* filter information for moderator */ }));
  }
}

class CustomerHelper implements RoleInstance {
  users = [];

  public getUsers(): User[] {
    return this.users.filter(user => ({ /* filter information for customer */ }));
  }
}

abstract class RoleCreator {
	public abstract getRoleInstance(): RoleInstance;
}

class AdminRoleCreator extends RoleCreator {
  public getRoleInstance() {
    return new AdminRole();
  }
}

class ModeratorRoleCreator extends RoleCreator {
  public getRoleInstance() {
    return new ModeratorHelper();
  }
}

class CustomerRoleCreator extends RoleCreator {
  public getRoleInstance() {
    return new CustomerHelper();
  }
}

function clientCode(roleCreator: RoleCreator) {
  const userHelper = roleCreator.getRoleInstance();
  console.log(userHelper.getUsers());
}

clientCode(new AdminRoleCreator()); // [ /* admin filtered posts */]
clientCode(new ModeratorRoleCreator()); // [ /* moderator filtered posts */]
clientCode(new CustomerRoleCreator()); // [ /* moderator filtered posts */]
