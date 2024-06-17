import authenticationService from '../services/authentication/authentication';
import usersService from '../services/users/users';
import todosService from '../services/todos/todos';

const main = async () => {
  const admin = await authenticationService.registerUser({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'P4ssw0rd!',
  });

  usersService.updateUser(admin.id, { role: 'admin' });

  const user1 = await authenticationService.registerUser({
    name: 'user1',
    email: 'user1@gmail.com',
    password: 'P4ssw0rd!',
  });

  const user2 = await authenticationService.registerUser({
    name: 'user2',
    email: 'user2@gmail.com',
    password: 'P4ssw0rd!',
  });

  await todosService.addTodo({
    title: "I should do that",
    ownerId: user1.id,
    done: false
  })

  await todosService.addTodo({
    title: "Finish this thing",
    ownerId: user2.id,
    done: false
  })

  await todosService.addTodo({
    title: "Learn how to read",
    ownerId: user2.id,
    done: true
  })
};

main();
