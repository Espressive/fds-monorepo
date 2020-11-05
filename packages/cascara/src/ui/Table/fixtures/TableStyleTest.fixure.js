import React from 'react';
import faker from 'faker';

const fakeRowData = () => ({
  avatar: faker.image.avatar(),
  country: faker.address.countryCode(),
  eid: faker.random.uuid(),
  fullName: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
  homePhone: faker.phone.phoneNumber(),
  officePhone: faker.phone.phoneNumber(),
  title: faker.name.jobTitle(),
});

const tableRow = (count) => {
  let rows = [];
  for (let i = 0; i < count; i++) {
    // Get new, fake data for each row
    const thisRowData = Object.entries(fakeRowData());

    rows.push(
      <tr key={i}>
        {thisRowData.map(([key, value]) => (
          <td className={key === 'avatar' ? 'long' : undefined} key={key}>
            {value}
          </td>
        ))}
      </tr>
    );
  }
  return rows;
};

const TableStyleTest = () => {
  const columnTitles = Object.entries(fakeRowData());
  const columnStyle = {
    gridTemplateColumns: `repeat(${columnTitles.length}, auto)`,
  };
  return (
    <table style={columnStyle}>
      <thead>
        <tr>
          {columnTitles.map(([key, value]) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tableRow(20)}</tbody>
      <tfoot>
        <tr>
          {columnTitles.map(([key, value]) => (
            <td key={key}>{key}</td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

const Fixture = <TableStyleTest />;

export default Fixture;
