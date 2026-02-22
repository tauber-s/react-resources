class Friend {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  };
};

class FriendsList {
  constructor() {
    this.friends = new Map();
  };

  add(friend) {
    if (this.friends.has(friend.name)) return false;
    this.friends.set(friend.name, friend);
    return true;
  };

  remove(friendName) {
    return this.friends.delete(friendName);
  };

  getAll() {
    return [...this.friends.values()];
  };

  count() {
    return this.friends.size;
  };

  getOldestFriend() {
    if (this.friends.size === 0) return null;

    return [...this.friends.values()].reduce(
      (oldest, current) =>
        current.age > oldest.age ? current : oldest
    );
  };
};

class FriendFactory {
  static create(name, age) {
    return new Friend(name, age);
  };
};

class Person {
  constructor(name, age, friendsList) {
    this.name = name;
    this.age = age;
    this.friendsList = friendsList ?? new FriendsList();
  };

  addFriend(friend) {
    return this.friendsList.add(friend);
  };

  getFriendsCount() {
    return this.friendsList.count();
  };

  getOldestFriend() {
    return this.friendsList.getOldestFriend();
  };

  getName() {
    return this.name;
  };

  getAge() {
    return this.age;
  };
};

class PersonFactory {
  static create({ name, age, friends = [] }) {
    const person = new Person(name, age);

    friends.forEach(friend =>
      person.addFriend(
        FriendFactory.create(friend.name, friend.age)
      )
    );

    return person;
  };
};


class People {
  constructor(people) {
    this.people = people;
  };

  withMoreFriends() {
    return this.people.reduce((max, current) =>
      current.getFriendsCount() > max.getFriendsCount() ? current : max
    );
  };

  withLessFriends() {
    return this.people.reduce((min, current) =>
      current.getFriendsCount() < min.getFriendsCount() ? current : min
    );
  };

  withOldestFriend() {
    let result = null;
    let oldestAge = 0;

    for (const person of this.people) {
      const oldestFriend = person.getOldestFriend();
      if (oldestFriend && oldestFriend.age > oldestAge) {
        oldestAge = oldestFriend.age;
        result = person;
      };
    };

    return result;
  };
};

class PeopleFactory {
  static create(peopleData) {
    const people = peopleData.map(data =>
      PersonFactory.create(data)
    );

    return new People(people);
  };
};

const people = PeopleFactory.create([
  {
    name: "John",
    age: 30,
    friends: [
      { name: "Paul", age: 35 },
      { name: "George", age: 40 }
    ]
  },
  {
    name: "Mary",
    age: 28,
    friends: [
      { name: "Anna", age: 50 }
    ]
  },
  {
    name: "Bob",
    age: 40
  }
]);

console.log(people.withMoreFriends());
console.log(people.withLessFriends());
console.log(people.withOldestFriend());

