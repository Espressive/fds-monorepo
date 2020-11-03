import faker from 'faker';

faker.seed(1);

export const generateFakeReport9 = (qty, from_date, to_date) =>
  new Array(qty).fill(null).map((e, i) => {
    // So we never have collisions, we have to start at 2 instead of 1
    faker.seed(i++ + 1);

    const date = faker.date.between(from_date, to_date).toUTCString();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const state = faker.address.state();

    const matchedIntent = faker.lorem.sentence(3, true);
    const actualMatchedIntent = faker.lorem.words(2, matchedIntent.split(' '));
    const actualMatchedApplication = faker.internet.domainWord();

    const randomTaskNumber = Math.floor(Math.random() * 1000 + 1000);
    const caseReference = `TASK-${randomTaskNumber}`;

    const availableCategories = [
      'category 1',
      'category 2',
      'category 3',
      'category 4',
      'category 5',
    ];

    const availableChannels = ['slack', 'email', 'web', 'Barista'];

    const availableServiceDepartments = [
      'Finance',
      'HR',
      'Engineering',
      'IT',
      'Facilities',
      'Sales',
      'Marketing',
    ];

    const availableServiceTeam = ['Alfa', 'Bravo', 'Charlie', 'Delta', 'Echo'];

    const availableSources = ['ELC', 'System', 'Customer'];

    const availableLocations = [
      'MX',
      'Floor 18',
      'Every Location',
      'US',
      'Palo Alto Office',
    ];

    return (e = {
      actualMatchedApplication,
      actualMatchedIntent,
      address: faker.address.direction(true),
      building: faker.address.secondaryAddress(),
      caseReference,
      channel: faker.random.arrayElement(availableChannels),
      city: faker.address.city(),
      conversation: faker.internet.url(),
      country: faker.address.country(),
      date,
      deflected: faker.random.boolean(),
      espCategory: faker.random.arrayElement(availableCategories),
      espServiceDepartment: faker.random.arrayElement(
        availableServiceDepartments
      ),
      espServiceTeam: faker.random.arrayElement(availableServiceTeam),
      floor: `${faker.address.cardinalDirection(true)} floor`,
      helpfulFeedback: faker.lorem.sentence(15),
      intentReviewed: faker.random.boolean(),
      interactionEid: faker.random.uuid(),
      interactionText: faker.random.words(6),
      matchedIntent,
      noResponse: faker.random.boolean(),
      postalCode: faker.address.zipCodeByState(state),
      serviceDepartment: faker.random.arrayElement(availableServiceDepartments),
      source: faker.random.arrayElement(availableSources),
      state: faker.address.state(),
      supportFeedback: faker.lorem.sentence(15),
      taskFeedback: faker.lorem.sentence(15),
      userDepartment: faker.commerce.department(),
      userJobRole: faker.name.jobTitle(),
      userLocation: faker.random.arrayElement(availableLocations),
      userName: faker.internet.userName(firstName, lastName),
      zone: faker.address.timeZone(),
    });
  });
