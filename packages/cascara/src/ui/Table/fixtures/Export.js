import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

import { generateFakeEmployees } from '../../../lib/mock/generateFakeEmployees';
import Table from '..';

class Fixture extends PureComponent {
  state = {
    columns: [
      {
        attribute: 'fullName',
        isEditable: false,
        isLabeled: false,
        label: 'Full Name',
        module: 'string',
      },
      {
        attribute: 'homePhone',
        isEditable: true,
        isLabeled: false,
        label: 'Home Phone',
        module: 'phone',
      },
      {
        attribute: 'eid',
        isEditable: false,
        isLabeled: false,
        label: 'ID',
        module: 'string',
      },
      {
        attribute: 'avatar',
        isEditable: false,
        isLabeled: false,
        label: 'Avatar',
        module: 'string',
      },
      {
        attribute: 'country',
        isEditable: false,
        isLabeled: false,
        label: 'Country',
        module: 'string',
      },
      {
        attribute: 'date',
        isEditable: false,
        isLabeled: false,
        label: 'Hired',
        module: 'date',
      },
      {
        attribute: 'department',
        isEditable: false,
        isLabeled: false,
        label: 'Department',
        module: 'string',
      },
      {
        attribute: 'nickname',
        isEditable: false,
        isLabeled: false,
        label: 'Nickname',
        module: 'string',
      },
      {
        attribute: 'officePhone',
        isEditable: false,
        isLabeled: false,
        label: 'Office phone',
        module: 'string',
      },
      {
        attribute: 'title',
        isEditable: false,
        isLabeled: false,
        label: 'Title',
        module: 'string',
      },
    ],
    data: generateFakeEmployees(50).map((employee) => ({
      ...employee,
    })),
    display: [
      {
        attribute: 'fullName',
        isEditable: false,
        isLabeled: false,
        label: 'Full Name',
        type: 'string',
      },
      {
        attribute: 'homePhone',
        isEditable: true,
        isLabeled: false,
        label: 'Home Phone',
        type: 'phone',
      },
    ],
  };

  handleColumnSelection = (_, { value: selectedColumns }) => {
    const { columns } = this.state;
    const newDisplay = columns
      .filter((column) => selectedColumns.includes(column.attribute))
      .reverse();

    this.setState({ display: newDisplay });
  };

  handleTableAction = (caller, data) => {
    const { display } = this.state;
    let csvHeader;
    let csvData;

    switch (caller.label) {
      case 'Export as CSV':
        csvHeader = display.reduce(
          (csvHeader, column, index, list) =>
            `${csvHeader}${column.label}${index < list.length - 1 ? ',' : ''}`,
          ''
        );

        csvData = data.reduce((csvData, row) => {
          const csvRow = Object.keys(row).reduce(
            (csvRow, column, index) =>
              `${csvRow}${row[column]}${
                index < Object.keys(row).length - 1 ? ',' : ''
              }`,
            ''
          );

          return `${csvData}
          ${csvRow}`;
        }, csvHeader);

        this.setState({ csvData });
        break;

      case 'Download':
        this.setState({ csvData: '' });
        break;

      default:
        return;
    }
  };

  render() {
    const { columns, data, display, csvData } = this.state;
    const bulkActions = csvData
      ? [
          {
            content: 'Download',
            data: csvData,
            fileName: 'Espressive Table - Employee.csv',
            fileType: 'text/csv',
            module: 'download',
          },
        ]
      : [
          {
            content: 'Export as CSV',
            module: 'button',
          },
        ];
    const dataConfig = {
      actions: [
        {
          content: 'View',
          module: 'button',
          size: 'small',
        },
        {
          module: 'edit',
          size: 'small',
        },
      ],
      bulkActions,
      display,
      uniqueIdAttribute: 'eid',
    };

    const availableColumns = columns.map((columnDef) => ({
      key: columnDef.attribute,
      text: columnDef.label,
      value: columnDef.attribute,
    }));

    const selectedColumns = display.map((columnDef) => columnDef.attribute);

    return (
      <>
        <Header as='h4'>
          <Header.Content>
            Displaying columns: <br />
            <Dropdown
              header='Select columns...'
              key={'select'}
              labeled
              multiple
              onChange={this.handleColumnSelection}
              options={availableColumns}
              placeholder='select columns... oh, great manu!'
              selectedLabel={'Display columns'}
              selection
              value={selectedColumns}
            />
          </Header.Content>
        </Header>

        <Table
          data={data}
          dataConfig={dataConfig}
          onAction={this.handleTableAction}
        />
      </>
    );
  }
}

export default Fixture;
